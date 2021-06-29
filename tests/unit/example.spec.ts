import { shallowMount } from "@vue/test-utils";
import CommitteeList from "@/components/CommitteeList.vue";

describe("CommitteeList.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(CommitteeList, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
