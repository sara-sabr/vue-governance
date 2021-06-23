import { shallowMount } from "@vue/test-utils";
import Committees from "@/components/Committees.vue";

describe("Committees.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Committees, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
