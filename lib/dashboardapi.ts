export const getDashboardData = async () => {
    try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
            throw new Error('Failed to fetch dashboard data');
        }
        
        const data = await response.json();
        
        // Проверка структуры данных
        if (
            !Array.isArray(data.projects) ||
            !Array.isArray(data.developers) ||
            !Array.isArray(data.employees) ||
            !Array.isArray(data.orders) ||
            !Array.isArray(data.messages)
        ) {
            throw new Error('Invalid data structure');
        }

        return data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
