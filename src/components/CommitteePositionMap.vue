<template>
  <div class="committee-details accordion mb-3" id="accordion-map">
    <div class="accordion-item">
      <h2 class="accordion-header" id="map">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse-map"
          aria-expanded="false"
          aria-controls="#collapse-map"
        >
          {{ $t("page.committees.committeePositionMap.title") }}
        </button>
      </h2>
      <div
        id="collapse-map"
        class="accordion-collapse collapse show"
        aria-labelledby="map"
        data-bs-parent="#accordion-map"
      >
        <div class="accordion-body">
          <div id="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Committee,
  GraphLink,
  GraphNode,
  Graph,
  Position,
  SankeyGraphNode,
  SankeyGraphLink,
} from "@/store/state";
import { Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { mapState } from "vuex";
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

@Component({
  computed: {
    ...mapState,
  },
})
export default class CommitteePositionMap extends Vue {
  @Prop() public positions!: Position[];
  @Prop() public committees!: Committee[];
  @Prop() public lang!: string;
  // lang = this.$i18n;

  colorTrue = "#fff";
  colorFalse = "#000";
  settings = {
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    height: 500,
    width: 900,
    color: "#ccc",
  };

  color = d3.scaleOrdinal(["#d4b4a3"], ["#da4f81"]).unknown("#ccc");

  getAttendees(committee: Committee): string[] {
    return [
      ...committee.chairs,
      ...committee.viceChairs,
      ...committee.members,
      ...committee.standingParticipants,
    ];
  }
  /**
   * Generates the data set for the graph
   */
  graph(): Graph {
    const committees = this.committees;
    const positions = this.positions;
    if (committees.length < 1 || positions.length < 1) {
      throw console.error("Invalid data set provided to generate graph");
    }
    const lang = this.lang;

    //Create nodes names
    const nodes: SankeyGraphNode[] = [];
    nodes.push({
      nodeId: "0",
      name:
        lang === "en"
          ? en.page.committees.committeePositionMap.notAssigned
          : fr.page.committees.committeePositionMap.notAssigned,
    });
    committees.forEach((committee) => {
      let nameEn = committee.name.en ? committee.name.en : "N/A";
      let nameFr = committee.name.fr ? committee.name.fr : "N/A";

      let node = {
        nodeId: committee.id.toString(),
        name: lang === "en" ? nameEn : nameFr,
      };
      nodes.push(node);
    });

    positions.forEach((position) => {
      let nameEn = position.name.en ? position.name.en : "N/A";
      let nameFr = position.name.fr ? position.name.fr : "N/A";

      let node = { nodeId: position.id, name: lang === "en" ? nameEn : nameFr };
      nodes.push(node);
    });
    // Create links
    let links: SankeyGraphLink[] = [];
    let allCommsAttendees: string[] = [];
    const positionsIds = positions.map((position) => position.id);
    if (committees.length > 0 || positionsIds.length > 0) {
      committees.forEach((committee) => {
        const committeeAttendees = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];
        allCommsAttendees = [...committeeAttendees];

        committeeAttendees.forEach((attendee) => {
          let positionIndex = positionsIds.findIndex(
            (positionID) => attendee === positionID
          );
          if (positionIndex !== -1) {
            let newLink: SankeyGraphLink = {
              source: attendee,
              target: committee.id.toString(),
              value: 1,
            };

            links.push(newLink);
          }
        });
      });
    }
    //Parse all positions to filter out positions not attending committees
    positionsIds.forEach((positionId) => {
      var positionIdIndex = allCommsAttendees.findIndex(
        (attendee) => attendee === positionId
      );
      if (positionIdIndex === -1) {
        let newLink: SankeyGraphLink = {
          source: positionId,
          target: "0",
          value: 1,
        };

        links.push(newLink);
      }
    });
    return { nodes, links };
  }
  /**
   * References leveraged to combine D3js, D3-Sankey, Vuejs and Typescript
   * D3js + Typescript: https://gist.github.com/MagicJohnJang/3cde82004e632e66b0fc5c156a7c16e9
   * Vue + Typescript:
   * - https://masteringjs.io/tutorials/vue/vue-d3
   * - https://vuejsexamples.com/tag/d3/
   * D3-Sankey:
   * - https://github.com/d3/d3-sankey#readme
   * - https://www.d3-graph-gallery.com/sankey
   */
  /**
   * TODO:
   * - Change graph nodes dimensions based on number of nodes of each type
   * - Test various fonts
   * - Adjust Nodes spacing
   * - Change colors (need more since more than 10 nodes)
   * - Fix type issues
   *  */

  chart(): void {
    var width = 960;
    //Setting height based on number of positions
    var height = this.positions.length * 15;
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("viewBox", "0 0 " + width + " " + height);

    var formatNumber = d3.format(",.0f");

    var format = function (d: number | { valueOf(): number }) {
      return formatNumber(d) + " Committees";
    };

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    const graph: Graph = this.graph();

    var sankey = d3Sankey
      .sankey<GraphNode, GraphLink>()
      .nodeId((d) => d.nodeId);

    sankey
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [width - 1, height - 6],
      ]);

    var link = svg
      .append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll<SVGPathElement, GraphLink>("path");

    var node = svg
      .append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll<SVGGElement, GraphNode>("g");

    sankey(graph);

    link = link
      .data(graph.links)
      .enter()
      .append("path")
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("stroke-width", function (d: GraphLink) {
        if (d.width) {
          return Math.max(1, d.width);
        }
        return 1;
      });

    link.append("title").text(function (d: GraphLink) {
      return d.source + " → " + d.target + "\n" + format(d.value);
    });

    node = node.data(graph.nodes).enter().append("g");

    node
      .append("rect")
      .attr("x", function (d: GraphNode) {
        if (d.x0 !== undefined) {
          return d.x0;
        }
        return 0;
      })
      .attr("y", function (d: GraphNode) {
        if (d.y0 !== undefined) {
          return d.y0;
        }
        return 0;
      })
      .attr("height", function (d: GraphNode) {
        if (d.y0 !== undefined && d.y1 !== undefined) {
          return d.y1 - d.y0;
        }
        return 0;
      })
      .attr("width", function (d: GraphNode) {
        if (d.x1 !== undefined && d.x0 !== undefined) {
          return d.x1 - d.x0;
        }
        return 0;
      })
      .attr("fill", function (d: GraphNode) {
        return color(d.name.replace(/ .*/, ""));
      })
      .attr("stroke", "#000");

    node
      .append("text")
      .attr("x", function (d: GraphNode) {
        if (d.x0 !== undefined) {
          return d.x0 - 6;
        }
        return 0;
      })
      .attr("y", function (d: GraphNode) {
        if (d.y1 !== undefined && d.y0 !== undefined) {
          return (d.y1 + d.y0) / 2;
        }
        return 0;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function (d: GraphNode) {
        return d.name;
      })
      .filter(function (d: GraphNode) {
        if (d.x0 !== undefined) {
          return d.x0 < width / 2;
        }
        return false;
      })
      .attr("x", function (d: GraphNode) {
        if (d.x1 !== undefined) {
          return d.x1 + 6;
        }
        return 0;
      })
      .attr("text-anchor", "start");

    node.append("title").text(function (d: GraphNode) {
      if (d.value !== undefined) {
        return d.name + "\n" + format(d.value);
      }
      return d.name;
    });
  }

  mounted(): void {
    this.chart();
  }
}
</script>
