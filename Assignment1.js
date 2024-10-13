function workingDaysBetween(startDay, endDay, yearlyGoal) {
    const begin = new Date(startDay);
    const end = new Date(endDay);
    let currentDay = new Date(begin);

    const totalDaysNoFriday = [];
    const activeWorkDays = [];
    const targetAllocation = [];

    let totalWorkDays = 0;

    const getMonthDays = (year, month) => new Date(year, month + 1, 0).getDate();

    while (currentDay <= end) {
        const year = currentDay.getFullYear();
        const month = currentDay.getMonth();
        const daysInMonth = getMonthDays(year, month);
        let daysWithoutFridays = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const loopDay = new Date(year, month, day);
            if (loopDay.getDay() !== 5) daysWithoutFridays++;
        }

        totalDaysNoFriday.push(daysWithoutFridays);

        let actualDaysInMonth = 0;
        for (let day = currentDay.getDate(); day <= daysInMonth; day++) {
            const loopDay = new Date(year, month, day);
            if (loopDay > end) break;
            if (loopDay.getDay() !== 5) actualDaysInMonth++;
        }

        activeWorkDays.push(actualDaysInMonth);
        totalWorkDays += actualDaysInMonth;

        currentDay.setMonth(currentDay.getMonth() + 1);
        currentDay.setDate(1);
    }

    activeWorkDays.forEach(days => {
        targetAllocation.push((yearlyGoal / 365) * days);
    });

    const totalGoalAchieved = targetAllocation.reduce((sum, num) => sum + num, 0);

    return {
        totalDaysNoFriday,
        activeWorkDays,
        targetAllocation,
        totalGoalAchieved
    };
}

console.log(workingDaysBetween('2024-01-01', '2024-03-31', 5220));