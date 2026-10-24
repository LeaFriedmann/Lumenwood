/**
 * Utility class for centralized management of multiple intervals.
 * Provides methods to start and stop all registered intervals.
 */
export class IntervalHub {
	static allIntervals = [];

	/**
	 * Starts a new interval and stores its ID in the internal registry.
	 *
	 * @param {Function} funct - The function to execute on each interval tick.
	 * @param {number} timer - Interval duration.
	 */
	static startInterval(funct, timer) {
		const newInterval = setInterval(funct, timer);
		IntervalHub.allIntervals.push(newInterval);
	}

	/**
	 * Stops all currently running intervals and clears the internal registry.
	 */
	static stopAllIntervals() {
		IntervalHub.allIntervals.forEach(clearInterval);
		IntervalHub.allIntervals = [];
	}
}
