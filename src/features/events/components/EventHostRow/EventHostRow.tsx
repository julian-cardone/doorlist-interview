import { useEffect, useRef, useState } from "react";
import { Input } from "../../../../components/ui/Input/Input";
import styles from "./EventHostRow.module.css";
import { useHorizontalWheelScroll } from "../../../../hooks/useHorizontalWheelScroll";
import { PlusIcon } from "../../../../components/ui/icons/PlusIcon";
import { MinusIcon } from "../../../../components/ui/icons/MinusIcon";
import { cx } from "../../../../lib/cssUtils";
import { GRADIENTS } from "../../../../lib/sampleData";
import type { EventHostRowProps } from "./EventHostRowProps";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

function gradientFor(name: string): string {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0x7fffffff;
  return GRADIENTS[hash % GRADIENTS.length];
}

export function EventHostRow({ hosts, onAdd, onRemove }: EventHostRowProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const addInputRef = useRef<HTMLInputElement>(null);
  const prevHostsLengthRef = useRef(hosts.length);
  const { ref: horizontalScrollRef, onWheel: handleHorizontalWheel } =
    useHorizontalWheelScroll<HTMLDivElement>();

  useEffect(() => {
    if (hosts.length > prevHostsLengthRef.current) {
      addInputRef.current?.focus();
    }
    prevHostsLengthRef.current = hosts.length;
  }, [hosts.length]);

  function confirm() {
    const name = inputValue.trim();
    if (name) onAdd(name);
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      confirm();
    }
    if (e.key === "Escape") setInputValue("");
  }

  function handleRemove() {
    onRemove(selectedIndex);
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  }

  // Empty state — standalone required pill matching Location/Description
  if (hosts.length === 0) {
    return (
      <Input
        variant="pill"
        textPrefix={<PlusIcon />}
        placeholder="Add Host"
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={confirm}
      />
    );
  }

  const clampedIndex = Math.min(selectedIndex, hosts.length - 1);
  const activeHost = hosts[clampedIndex];

  const addHostRow = (
    <div className={styles.hostRow}>
      <span className={styles.addPrefix}>
        <PlusIcon />
      </span>
      <input
        ref={addInputRef}
        className={styles.addInput}
        placeholder="Add Host"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={confirm}
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <div className={styles.hostRow}>
          <HostAvatar gradient={gradientFor(activeHost)} name={activeHost} />
          <span className={styles.hostName}>{activeHost}</span>
          <button
            type="button"
            className={styles.removeCircleBtn}
            aria-label={`Remove ${activeHost}`}
            onClick={handleRemove}
          >
            <MinusIcon />
          </button>
        </div>
        <div className={styles.groupDivider} />
        {addHostRow}
      </div>

      <div
        className={cx(styles.stackRow, "scrollX")}
        ref={horizontalScrollRef}
        onWheel={handleHorizontalWheel}
      >
        {hosts.map((name, i) => {
          const isSelected = i === clampedIndex;
          const cls = [
            styles.stackAvatar,
            i > 0 ? styles.stackAvatarOffset : "",
            isSelected ? styles.stackAvatarSelected : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={i}
              type="button"
              className={cls}
              style={{
                background: gradientFor(name),
                zIndex: isSelected ? hosts.length + 1 : hosts.length - i,
              }}
              aria-label={name}
              aria-pressed={isSelected}
              onClick={() => setSelectedIndex(i)}
            />
          );
        })}
      </div>
    </div>
  );
}

function HostAvatar({ gradient, name }: { gradient: string; name: string }) {
  return (
    <span className={styles.hostAvatar} style={{ background: gradient }}>
      {initials(name)}
    </span>
  );
}
