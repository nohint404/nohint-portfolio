"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

const commands = [
  { label: "Home", hint: "Identity and overview", href: "/", shortcut: "H" },
  { label: "Selected work", hint: "Inspect the featured build", href: "/#work", shortcut: "W" },
  { label: "Labs", hint: "Experiments and field notes", href: "/labs", shortcut: "L" },
  {
    label: "GitHub",
    hint: "Open the source profile",
    href: "https://github.com/nohint404",
    shortcut: "G",
    external: true,
  },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const updateOpen = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => {
          const nextOpen = !current;
          if (!nextOpen) requestAnimationFrame(() => triggerRef.current?.focus());
          return nextOpen;
        });
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function selectCommand(href: string, external = false) {
    updateOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  }

  return (
    <>
      <Button
        ref={triggerRef}
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Open command palette"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => updateOpen(true)}
        className="bg-secondary text-muted-foreground hover:bg-[#232326] hover:text-foreground"
        style={{ borderRadius: "2px" }}
      >
        <span aria-hidden="true" className="text-[13px]">
          ⌘
        </span>
        <span className="text-[13px]">K</span>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={updateOpen}
        title="Navigate nohint404"
        description="Search pages and source links"
        className="sm:max-w-xl"
      >
        <Command label="Site navigation">
          <CommandInput placeholder="Type a destination…" />
          <CommandList>
            <CommandEmpty>No matching destination.</CommandEmpty>
            <CommandGroup heading="Navigate">
              {commands.map((command, index) => (
                <CommandItem
                  key={command.href}
                  value={`${command.label} ${command.hint}`}
                  onSelect={() => selectCommand(command.href, "external" in command)}
                >
                  <span aria-hidden="true" className="font-mono text-[0.6875rem] text-foreground">
                    0{index + 1}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span>{command.label}</span>
                    <span className="truncate text-xs text-muted-foreground" style={{ color: "#c2c2c6" }}>
                      {command.hint}
                    </span>
                  </span>
                  <CommandShortcut>{command.shortcut}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
