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
          MAP
        </button>
      </h2>
      <div
        id="collapse-map"
        class="accordion-collapse collapse"
        aria-labelledby="map"
        data-bs-parent="#accordion-map"
      >
        <div class="accordion-body">
          <div id="chart">
            <svg id="sankey"></svg>
            <p
              v-for="node in graph(committees, positions).links"
              :key="node.id"
            >
              {{ node }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Committee, SLink, SNode, Position, SGraph } from "@/store/state";
import { Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { mapState } from "vuex";
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";

@Component({
  computed: {
    ...mapState,
  },
})
export default class CommitteePositionMap extends Vue {
  @Prop() public positions!: Position[];
  @Prop() public committees!: Committee[];
  @Prop() public lang!: string;

  colorTrue = "#fff";
  colorFalse = "#000";
  settings = {
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    height: 500,
    width: 900,
    color: "#ccc",
  };

  color = d3.scaleOrdinal(["#d4b4a3"], ["#da4f81"]).unknown("#ccc");

  graph = function (
    committees: Committee[],
    positions: Position[],
    lang: string
  ): SGraph {
    // const committees: Committee[] = committees;
    // const positions: Position[] = positions;
    //Create nodes names
    const nodes: SNode[] = [];
    committees.forEach((committee) => {
      let nameEn = committee.name.en ? committee.name.en : "N/A";
      let nameFr = committee.name.fr ? committee.name.fr : "N/A";

      let node = {
        nodeId: committee.id,
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
    let links: SLink[] = [];
    const positionsIds = positions.map((position) => position.id);
    if (committees.length > 0 || positionsIds.length > 0) {
      committees.forEach((committee) => {
        const committeeAttendees = [
          ...committee.chairs,
          ...committee.viceChairs,
          ...committee.members,
          ...committee.standingParticipants,
        ];

        committeeAttendees.forEach((attendee) => {
          let positionIndex = committeeAttendees.findIndex(
            (committeePosition) => attendee === committeePosition
          );
          if (positionIndex !== -1) {
            let newLink: SLink = {
              source: attendee,
              target: committee.id,
              value: 1,
            };

            links.push(newLink);
          }
        });
      });
    }

    return { nodes, links };
  };

  sankey = d3Sankey
    .sankey()
    .nodeWidth(4)
    .nodePadding(20)
    .extent([
      [0, 5],
      [this.settings.width, this.settings.width - 5],
    ]);

  DrawChart(graph: SGraph): d3.BaseType | null {
    var svg = d3
      .select("#sankey")
      .attr("width", this.settings.width)
      .attr("height", this.settings.height);
    this.sankey.nodes(graph.nodes).links(graph.links);
    svg
      .append("g")
      .selectAll("rect")
      .data(graph.nodes)
      .join("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .append("title")
      .text((d: any) => `${d.name}\n${d.value.toLocaleString()}`);

    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(graph.links)
      .join("path")
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("stroke", (d: any) => this.color(d.names[0]))
      .attr("stroke-width", (d: any) => d.width)
      .style("mix-blend-mode", "multiply")
      .append("title")
      .text((d: any) => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`);

    svg
      .append("g")
      .style("font", "10px sans-serif")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", (d: any) =>
        d.x0 < this.settings.width / 2 ? d.x1 + 6 : d.x0 - 6
      )
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) =>
        d.x0 < this.settings.width / 2 ? "start" : "end"
      )
      .text((d: any) => d.name)
      .append("tspan")
      .attr("fill-opacity", 0.7)
      .text((d: any) => ` ${d.value.toLocaleString()}`);

    return svg.node();
  }

  mounted(): void {
    // this.init();
    const graph = this.graph(this.committees, this.positions, this.lang);
    this.DrawChart(graph);
  }
}
</script>
