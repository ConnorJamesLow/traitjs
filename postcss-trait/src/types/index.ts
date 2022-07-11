import { Plugin, PluginCreator, Processor } from "postcss"

export interface TraitPluginOptions {

}

export type TraitPlugin = PluginCreator<TraitPluginOptions> & { postcss?: true }
