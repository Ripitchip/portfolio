"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
	const { setTheme, resolvedTheme } = useTheme();

	const isDark = resolvedTheme === "dark";

	return (
		<Button
			variant="ghost"
			className="w-10 px-0"
			onClick={() => setTheme(isDark ? "light" : "dark")}
		>
			<Sun className={isDark ? "hidden" : "block"} />
			<Moon className={isDark ? "block" : "hidden"} />
			<span className="sr-only">Toggle Theme</span>
		</Button>
	);
}
