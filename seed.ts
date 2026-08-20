// seed.ts
import { prisma } from './src/lib/prisma';

async function main() {
    console.log('🌱 Iniciando o seed...');

    const products = [
        {
            name: 'Sofá Retrátil 3 Lugares',
            price: 1899.90,
            description: 'Sofá retrátil e reclinável em tecido suave.',
            imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400',
            stock: 10,
        },
        {
            name: 'Armário de Cozinha Planejado',
            price: 2450.00,
            description: 'Armário alto padrão com acabamento em MDF.',
            imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400',
            stock: 5,
        },
        {
            name: 'Ventilador de Coluna Turbo',
            price: 349.90,
            description: 'Ventilador com 3 velocidades e controle remoto.',
            imageUrl: 'https://images.unsplash.com/photo-1595514535415-1b15bfa9d55c?w=400&h=400',
            stock: 25,
        },
        {
            name: 'Geladeira Frost Free 450L',
            price: 3790.00,
            description: 'Geladeira Frost Free com painel digital.',
            imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=400',
            stock: 8,
        },
        {
            name: 'Mesa de Jantar com 6 Cadeiras',
            price: 1599.00,
            description: 'Mesa de madeira maciça e seis cadeiras estofadas.',
            imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400',
            stock: 6,
        },
        {
            name: 'Micro-ondas 30L Painel Táctil',
            price: 679.90,
            description: 'Micro-ondas com função Grill e painel táctil.',
            imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400',
            stock: 15,
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
        console.log(`✅ Produto criado: ${product.name}`);
    }

    console.log('🎉 Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });