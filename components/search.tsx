'use client';

import {
  SearchDialog as SearchDialogRoot,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { productFromUrl } from '@/lib/products';

function Item({
  item,
  onClick,
  table,
}: {
  item: SearchItemType;
  table?: Parameters<typeof SearchDialogListItem>[0]['table'];
  onClick: () => void;
}) {
  if (item.type === 'action') {
    return <SearchDialogListItem item={item} table={table} onClick={onClick} />;
  }

  const product = productFromUrl(item.url);

  return (
    <div className="relative">
      {product ? (
        <span
          aria-hidden="true"
          className="absolute start-3 top-3.5 size-2 rounded-[1px]"
          style={{ backgroundColor: product.accent }}
        />
      ) : null}
      <SearchDialogListItem
        item={item}
        table={table}
        onClick={onClick}
        className={product ? 'ps-8' : undefined}
      />
    </div>
  );
}

export default function SearchDialog(props: SharedProps) {
  const { search, onSearchChange, isLoading, data, error } = useDocsSearch({
    type: 'fetch',
    api: '/api/search',
  });

  return (
    <SearchDialogRoot
      {...props}
      search={search}
      onSearchChange={onSearchChange}
      isLoading={isLoading}
      data={data}
      error={error}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder="Search Numiq and Numviz documentation" />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList Item={Item} />
      </SearchDialogContent>
    </SearchDialogRoot>
  );
}
