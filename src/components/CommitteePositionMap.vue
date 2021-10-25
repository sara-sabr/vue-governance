<template ref="map">
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
        class="accordion-collapse collapse"
        aria-labelledby="map"
        data-bs-parent="#accordion-map"
      >
        <div class="accordion-body">
          <button
            v-if="showGraph === false"
            class="btn btn-primary"
            @click="chart(graphData)"
          >
            Generate Chart
          </button>
          <button
            v-if="showGraph === true"
            class="btn btn-primary"
            @click="deleteChart"
          >
            Remove Chart
          </button>
          <div id="chart" class="mt-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { GraphLink, GraphNode, Graph } from "@/store/state";
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { mapState } from "vuex";
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

@Component({
  data() {
    return {
      // graphData: this.$store.getters.getCommitteesPositionsGraphData,
      showGraph: false,
      colorTrue: "#fff",
      colorFalse: "#000",
      settings: {
        margin: { top: 30, right: 30, bottom: 30, left: 30 },
        height: 500,
        width: 900,
        color: "#ccc",
      },
    };
  },
  computed: {
    graphData(): Graph {
      return this.$store.getters.getMappedCommitteesPositionsGraphData;
    },
    ...mapState(["lang", "committees", "positions"]),
  },
  methods: {
    chart(graph: Graph): void {
      this.$data.showGraph === true
        ? (this.$data.showGraph = false)
        : (this.$data.showGraph = true);
      // let graph: Graph = this.$store.getters.getCommitteesPositionsGraphData;
      var width = this.$data.settings.width;
      //Setting height based on number of positions
      var height = graph.nodes.length * 15;
      d3.select("#chart").selectChild("svg").remove();
      var svg = d3
        .select("#chart")
        .append("svg")
        .attr("viewBox", "0 0 " + width + " " + height);
      var formatNumber = d3.format(",.0f");
      var format = function (d: number | { valueOf(): number }) {
        return formatNumber(d) + " Committees";
      };
      var color = d3.scaleOrdinal(d3.schemeCategory10);
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
        .attr("font-size", 14)
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
    },
    deleteChart() {
      d3.select("#chart").selectChild("svg").remove();
      this.$data.showGraph === true
        ? (this.$data.showGraph = false)
        : (this.$data.showGraph = true);
    },
  },
})
export default class CommitteePositionMap extends Vue {}
</script>
