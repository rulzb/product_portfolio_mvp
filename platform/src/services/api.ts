import type { Product, DashboardData } from '../types';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial Mock Data
const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'web-platform',
        name: 'Plataforma Web',
        description: 'Canal Principal',
        status: 'stable',
        iconName: 'globe',
        metrics: {
            name: 'Conversión',
            value: '2.4%',
            trend: '5.2%',
            trendDirection: 'up'
        },
        sparkline: { color: '#10B981', data: [] }
    },
    {
        id: 'ios-app',
        name: 'App Móvil iOS',
        description: 'v4.2.0',
        status: 'warning',
        iconName: 'smartphone',
        metrics: {
            name: 'Retención D30',
            value: '42%',
            trend: '0.0%',
            trendDirection: 'flat'
        },
        sparkline: { color: '#F59E0B', dashed: true, data: [] }
    },
    {
        id: 'backoffice',
        name: 'Backoffice Admin',
        description: 'Herramientas Internas',
        status: 'critical',
        iconName: 'server',
        metrics: {
            name: 'Tasa de Errores',
            value: '1.8%',
            trend: '+0.5%',
            trendDirection: 'up'
        },
        sparkline: { color: '#EF4444', data: [] }
    }
];

class ApiService {
    private storageKey = 'mvp_products';

    constructor() {
        // Initialize localStorage if empty
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify(INITIAL_PRODUCTS));
        }
    }

    private getStoredProducts(): Product[] {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
    }

    async getProducts(): Promise<Product[]> {
        await delay(500); // Simulate network
        return this.getStoredProducts();
    }

    async createProduct(name: string, description: string): Promise<Product> {
        await delay(800);
        const products = this.getStoredProducts();

        const newProduct: Product = {
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name,
            description: description || 'Nuevo Producto',
            status: 'stable', // Default
            iconName: 'globe', // Default
            metrics: {
                name: 'Conversión',
                value: '0.0%',
                trend: '0%',
                trendDirection: 'flat'
            },
            sparkline: { color: '#10B981', data: [] }
        };

        products.push(newProduct);
        localStorage.setItem(this.storageKey, JSON.stringify(products));
        return newProduct;
    }

    async getDashboardData(productId: string): Promise<DashboardData> {
        await delay(600);
        // Return mock data for any product ID
        return {
            productId,
            metrics: {
                conversion: { labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], values: [2.1, 2.2, 2.8, 2.4, 2.3, 2.5, 2.4] },
                errors: { labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], values: [1.2, 1.1, 1.8, 1.5, 1.3, 1.4, 1.8] },
                latency: { labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], values: [120, 130, 125, 140, 135, 145, 130] },
                abandonment: { labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], values: [45, 42, 48, 44, 43, 40, 42] }
            },
            insights: [
                {
                    id: '1',
                    type: 'critical',
                    title: 'Caída de Conversión post-deploy',
                    description: 'Se detectó una correlación del 92% entre el Deploy v2.4 y la caída en el funnel.',
                    timestamp: 'Hace 2h'
                },
                {
                    id: '2',
                    type: 'warning',
                    title: 'Latencia inusual API Login',
                    description: 'Tiempos de respuesta +200ms sin deploy asociado.',
                    timestamp: 'Hace 5h'
                }
            ]
        };
    }
}

export const api = new ApiService();
