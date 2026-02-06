import * as React from "react";
import RcPagination from "@rc-component/pagination";
import enUS from "@rc-component/pagination/lib/locale/en_US";
import type { PaginationProps as RcPaginationProps } from "@rc-component/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import "./styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select-new";

export interface PaginationProps extends Omit<
  RcPaginationProps,
  "locale" | "selectComponentClass"
> {
  size?: "default" | "small";
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  onShowSizeChange?: (current: number, size: number) => void;
}

const AntPagination: React.FC<PaginationProps> = ({
  className,
  size = "default",
  showQuickJumper = false,
  showSizeChanger = true,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize = 10,
  onShowSizeChange,
  ...props
}) => {
  const prefixCls = "rc-pagination";

  const iconsProps = React.useMemo(() => {
    const iconSize = size === "small" ? 14 : 16;

    const prevIcon = (
      <button className={`-item-link`} type="button" tabIndex={-1}>
        <ChevronLeft size={iconSize} />
      </button>
    );

    const nextIcon = (
      <button className={`-item-link`} type="button" tabIndex={-1}>
        <ChevronRight size={iconSize} />
      </button>
    );

    const jumpPrevIcon = (
      <a className={`-item-link`}>
        <div className={`-item-container`}>
          <ChevronsLeft className={`-item-link-icon`} size={iconSize} />
          <span className={`-item-ellipsis`}>•••</span>
        </div>
      </a>
    );

    const jumpNextIcon = (
      <a className={`-item-link`}>
        <div className={`-item-container`}>
          <ChevronsRight className={`-item-link-icon`} size={iconSize} />
          <span className={`-item-ellipsis`}>•••</span>
        </div>
      </a>
    );

    return { prevIcon, nextIcon, jumpPrevIcon, jumpNextIcon };
  }, [size]);

  const sizeChangerRender: RcPaginationProps["sizeChangerRender"] = (info) => {
    const { disabled, size: currentPageSize, onSizeChange, options } = info;

    return (
      <Select
        disabled={disabled}
        value={String(currentPageSize)}
        onValueChange={(val) => {
          const newSize = Number(val);
          onSizeChange?.(newSize);
          onShowSizeChange?.(props.current || 1, newSize);
        }}
      >
        <SelectTrigger
          className={cn(
            "h-9 w-auto min-w-[110px]",
            size === "small" && "h-8 text-xs min-w-[100px]",
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  return (
    <RcPagination
      {...iconsProps}
      {...props}
      pageSize={pageSize}
      prefixCls={prefixCls}
      className={cn(size === "small" && `-mini`, className)}
      locale={enUS}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={pageSizeOptions}
      sizeChangerRender={sizeChangerRender}
      showQuickJumper={showQuickJumper}
    />
  );
};

export { AntPagination };
