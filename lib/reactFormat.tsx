import type { ReactNode } from 'react';
import { listFormatter } from './format';

export function formatNodeList<T = unknown>({
  items,
  componentConstructor,
}: {
  items: Array<T>;
  componentConstructor: (item: T) => ReactNode;
}) {
  const nodes: Array<ReactNode> = [];
  if (items.length) {
    const listStructure = listFormatter
      .formatToParts(items.map((_, i) => i.toString()))
      .map(({ value }) => value);
    for (const listPart of listStructure) {
      const idx = Number.parseInt(listPart, 10);
      if (Number.isFinite(idx)) {
        const item = items[idx];
        if (item) {
          nodes.push(' ');
          nodes.push(componentConstructor(item));
        }
      } else {
        nodes.push(listPart);
      }
    }
    nodes.push('.');
  }
  return nodes;
}
