import { TraitPlugin } from "./types";
import Traits from "./traits";
import postcss from "postcss";

const plugin: TraitPlugin = (_ = {}) => {
  // Work with options here
  const traits = new Traits();
  return {
    postcssPlugin: 'postcss-trait',
    AtRule: {
      trait: traits.add,
      is: traits.apply,
    },
  }
}


plugin.postcss = true;
export = plugin;
