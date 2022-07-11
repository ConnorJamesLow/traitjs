import { AtRule, Helpers, ChildNode, DeclarationProps, ChildProps, AtRuleProps, Rule } from "postcss";
import { LOGGER } from "./util";

export default class Traits {
    private traits: Map<string, DeclarationProps | ChildNode[]>

    constructor() {
        this.traits = new Map();
        this.add = this.add.bind(this);
        this.apply = this.apply.bind(this);
        this.wrapWithMedia = this.wrapWithMedia.bind(this);
    }

    add(rule: AtRule, helper: Helpers) {
        const { traits } = this;
        const { params, nodes } = rule;
        LOGGER.debug('ADD', params);

        // Grab the trait name and possibly property + values for inline decl.
        const [name, ...inline] = params.split(' ');
        if (inline.length) {
            LOGGER.tab().debug('type: inline ->', `name="${name}" inline="${inline.join(' ')}"`);
            // Has inline declaration, split property from value:
            const [prop, value] = inline.join(' ').split(/:\s?/);

            // Validate inline declaration:
            if (value) {
                // Remove ":" from property
                traits.set(name, { prop, value });
            } else {
                // Split failed, no values given.
                helper.result.warn('Ignoring incorrect usage of @trait', {
                    start: rule.source?.start
                });
            }
        } else if (nodes) {
            LOGGER.tab().debug('type: nodes ->', nodes.length);
            traits.set(name, nodes);
        }
        rule.remove();
    }

    apply(rule: AtRule, helper: Helpers) {
        const { traits } = this;
        const { parent } = rule;
        LOGGER.debug('APPLY', rule.params);

        // Get the list of traits to apply
        const applied = rule.params.split(' ');

        // Replace rule with css:
        rule.replaceWith(applied.reduce<ChildNode[]>((acc, key) => {
            const trait = traits.get(key);
            if (Array.isArray(trait)) {
                // Trait block
                for (const node of trait) {
                    if (node.type === 'atrule' && node.name === 'media') {
                        LOGGER.tab().debug('media query:', node.params);

                        // Handle media queries.
                        if (parent?.type === 'rule') {
                            this.wrapWithMedia(parent as Rule, node);
                        }
                        continue;
                    }
                    acc.push(node.clone());
                }
            } else if (trait) {
                // Inline trait
                acc.push(helper.decl(trait));
            } else {
                helper.result.warn(`Unknown trait "${key}" ignored.`);
            }
            return acc;
        }, []));
    }

    private wrapWithMedia(origin: Rule, media: AtRule) {
        // Clone the rule selector and copy in the media nodes.
        const wrapped = new Rule({
            nodes: media.nodes.map(n => n.clone()),
            selector: origin.selector,
            raws: {
                ...origin.raws,
                before: media.raws.before,
                after: media.raws.after
            },
        });

        // Wrap the selector in the media
        const wrapper = media.clone({
            nodes: [wrapped],
            raws: {
                ...media.raws,
                before: `\n${origin.raws.before}`,
                after: origin.raws.after
            }
        });

        // Add the media after the original rule.
        origin.after(wrapper);
    }
}
