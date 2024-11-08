import { TimeSpan } from '@/types';
import { Nullable } from '@/types/nullable';

export function exportUseTimeSpan(timespan?: TimeSpan, date: Nullable<Date> = null): Date {
	const startDate = isNullOrEmpty(date) ? new Date() : (date as Date);
	const persistedDays = timespan?.days ?? 0;
	const persistedHours = timespan?.hours ?? 0;
	const persistedMinutes = timespan?.minutes ?? 0;
	const persistedSeconds = timespan?.seconds ?? 0;
	const persistedMilliseconds = timespan?.milliseconds ?? 0;
	const endTime = new Date(
		startDate.getTime() +
			persistedDays * 24 * 60 * 60 * 1000 +
			persistedHours * 60 * 60 * 1000 +
			persistedMinutes * 60 * 1000 +
			persistedSeconds * 1000 +
			persistedMilliseconds,
	);
	return endTime;
}
