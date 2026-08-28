"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Copy, Locale } from "@/lib/i18n";
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

export function CommandPalette({ locale, content }: { locale: Locale; content: Copy["command"] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const commands = [
    { label: "Home", hint: "nohint404", href: `/${locale}`, shortcut: "H" },
    { label: locale === "it" ? "Progetti" : "Selected work", hint: locale === "it" ? "Apri l’archivio" : "Inspect the archive", href: `/${locale}/#work`, shortcut: "W" },
    { label: locale === "it" ? "Lab" : "Labs", hint: locale === "it" ? "Esperimenti e note" : "Experiments and notes", href: `/${locale}/labs`, shortcut: "L" },
    { label: "GitHub", hint: locale === "it" ? "Apri il profilo" : "Open source profile", href: "https://github.com/nohint404", shortcut: "G", external: true },
  ] as const;

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
        aria-label={content.open}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => updateOpen(true)}
        className="command-button"
      >
        <span aria-hidden="true" className="text-[13px]">
          ⌘
        </span>
        <span className="text-[13px]">K</span>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={updateOpen}
        title={content.title}
        description={content.description}
        className="sm:max-w-xl data-open:animate-none data-closed:animate-none"
      >
        <Command label="Site navigation" className="command-palette">
          <CommandInput placeholder={content.placeholder} />
          <CommandList>
            <CommandEmpty>{content.empty}</CommandEmpty>
            <CommandGroup heading="Navigate">
              {commands.map((command, index) => (
                <CommandItem
                  key={command.href}
                  value={`${command.label} ${command.hint}`}
                  onSelect={() => selectCommand(command.href, "external" in command)}
                >
                  <span aria-hidden="true" className="font-mono text-[0.6875rem] text-foreground group-data-selected/command-item:text-accent-foreground">
                    0{index + 1}
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span>{command.label}</span>
                    <span className="truncate text-xs text-muted-foreground group-data-selected/command-item:text-accent-foreground">
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
