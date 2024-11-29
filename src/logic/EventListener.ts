/**
 * @file Implements a simple event listener.
 * @license LGPL-3.0
 */

export class TCEventListener {
	eventListeners: Map<string, Array<Callback>> = new Map();
	on(event: string, callback: Callback) {
		if (!this.eventListeners.has(event)) this.eventListeners.set(event, []);
		this.eventListeners.get(event)!.push(callback);
	}
	off(event: string, callback: Callback) {
		if (!this.eventListeners.has(event)) return;
		const callbacks = this.eventListeners.get(event)!;
		const index = callbacks.indexOf(callback);
		if (index !== -1) callbacks.remove(index);
	}

	emit(event: string, ...args: unknown[]) {
		if (this.eventListeners.has(event)) this.eventListeners.get(event)!.forEach((listener) => listener(...args));
	}
}
