/**
 * @file 国旗小图标
 * @author svon.me@gmail.com
 */

import { defineComponent, h as createElement } from "vue";

const countryPic = function(value: string | number) {
  const name = String(value).replace(/^(pic-{0,})?(\d+)(\.[a-z]+)?$/ig, "$2");
  const path = "https://crm.eciol.com/assets/images/country";
  if (/\.[a-z]+$/i.test(name)) {
    return `${path}/${name}`;
  }
  return `${path}/${name}.gif`;
};

const onError = (e: Event) => {
  if (e.target) {
    const img = e.target as HTMLImageElement;
    img.src = countryPic(0);
  }
}

export default defineComponent({
  name: "pic",
  props: {
    name: {
      required: true,
      type: [String, Number]
    },
  },
  setup (props: { name: string | number; }) {
    return () => {
      const width = "var(--eci-icon-size)";
      const maxHeight = "var(--eci-icon-size)";
      const style = { width, maxHeight };
      const img = createElement("img", { src: countryPic(props.name), style, onError });
      return createElement("span", {}, img);
    }
  }
});