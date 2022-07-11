import postcss from 'postcss';
import plugin from '.';
import logger from './util/logger';
import { TraitPluginOptions } from './types';

async function run(input: string, output: string, opts?: TraitPluginOptions) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  logger.dump();
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes instances of inline @trait from output', async () => {
  await run(`@trait red color: red;`, ``);
});

it('removes instances of @trait block from output', async () => {
  await run(`@trait red {
  color: red;
}`, ``);
});

it('can apply inline trait to all usages', async () => {
  await run(`@trait red color: red;
.foo { background: black; @is red; } .bar { @is red; background: black; }`,
    `.foo { background: black; color: red; } .bar { color: red; background: black; }`);
});

it('can apply trait block to all usages', async () => {
  await run(`@trait red { color: red; }
.foo { background: black; @is red; } .bar { @is red; background: black; } .baz { @is red; }`,
    `.foo { background: black; color: red; } .bar { color: red; background: black; } .baz { color: red; }`);
});

it('wraps parent class with media query', async() => {
  const INPUT = `@trait thin {
  width: 1px;
  @media screen and (min-width: 1000px) {
    width: 2px;
  }
}

.foo {
  @is thin;
}`;
  await run(INPUT, `.foo {
  width: 1px;
}
@media screen and (min-width: 1000px) {
  .foo {
    width: 2px;
  }
}`)
});

it('works with odd characters', async () => {
  await run(`@trait mb-0.5 { margin-bottom: 0.5rem; }
.foo { @is mb-0.5; }`,
    `.foo { margin-bottom: 0.5rem; }`);
    await run(`@trait w-1/2 { width: 50%; }
.foo { @is w-1/2; }`,
    `.foo { width: 50%; }`);
});
