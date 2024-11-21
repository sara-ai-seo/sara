export function calculatePercentage(value: number, total: number): number {
    if (total === 0) {
        return 0; // Avoid division by zero
    }
    return (value / total) * 100;
}