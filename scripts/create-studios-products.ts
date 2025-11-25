import 'dotenv/config';

const SHOPIFY_ADMIN_API_URL = `https://${process.env.VITE_SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_TOKEN;

interface CreateProductInput {
  title: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  variants: Array<{
    title: string;
    price: string;
    sku: string;
  }>;
}

async function shopifyAdminRequest(query: string, variables?: any) {
  const response = await fetch(SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error('Shopify API Error:', JSON.stringify(result.errors, null, 2));
    throw new Error('Shopify API request failed');
  }

  return result.data;
}

async function createStudioProduct(product: CreateProductInput) {
  const createProductMutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = {
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    productType: product.productType,
    vendor: product.vendor,
    tags: product.tags,
    variants: product.variants.map(v => ({
      price: v.price,
      title: v.title,
      inventoryPolicy: 'CONTINUE',
      inventoryManagement: null,
    })),
  };

  const data = await shopifyAdminRequest(createProductMutation, { input });

  if (data.productCreate.userErrors.length > 0) {
    console.error('Product creation errors:', data.productCreate.userErrors);
    throw new Error('Failed to create product');
  }

  return data.productCreate.product;
}


async function addProductToCollection(productId: string, collectionId: string) {
  const mutation = `
    mutation collectionAddProducts($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) {
        collection {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  await shopifyAdminRequest(mutation, {
    id: collectionId,
    productIds: [productId],
  });
}

async function createCollection(title: string, description: string) {
  const mutation = `
    mutation collectionCreate($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = {
    title,
    descriptionHtml: description,
  };

  const data = await shopifyAdminRequest(mutation, { input });

  if (data.collectionCreate.userErrors.length > 0) {
    console.error('Collection creation errors:', data.collectionCreate.userErrors);
    return null;
  }

  return data.collectionCreate.collection;
}

async function main() {
  console.log('🎬 Création des produits Studios sur Shopify...\n');

  const collection = await createCollection(
    'Studios Location',
    '<p>Louez nos studios professionnels à l\'heure, demi-journée ou journée complète. Équipements premium inclus.</p>'
  );

  if (!collection) {
    console.error('❌ Impossible de créer la collection');
    return;
  }

  console.log(`✅ Collection créée: ${collection.title} (${collection.id})\n`);

  const studiosProducts: CreateProductInput[] = [
    {
      title: 'Studio Podcast Le 40',
      descriptionHtml: `
        <h3>Studio podcast professionnel équipé</h3>
        <ul>
          <li>Interface audio Focusrite Scarlett</li>
          <li>2 microphones Shure SM7B</li>
          <li>Casques monitoring professionnels</li>
          <li>Traitement acoustique complet</li>
          <li>Enregistrement multipiste</li>
          <li>Table de mixage 8 canaux</li>
          <li>Espace confortable pour 2-3 personnes</li>
        </ul>
        <p><strong>Prix dégressifs :</strong></p>
        <ul>
          <li>2 heures : 80€ (40€/h)</li>
          <li>4 heures : 140€ (35€/h) - Économie 12.5%</li>
          <li>8 heures : 250€ (31.25€/h) - Économie 22%</li>
        </ul>
      `,
      productType: 'Studio Location',
      vendor: 'Le 40',
      tags: ['studio', 'studio-podcast', 'location-horaire'],
      variants: [
        { title: '2 heures', price: '80.00', sku: 'STUDIO-PODCAST-2H' },
        { title: '4 heures (Demi-journée)', price: '140.00', sku: 'STUDIO-PODCAST-4H' },
        { title: '8 heures (Journée complète)', price: '250.00', sku: 'STUDIO-PODCAST-8H' },
      ],
    },
    {
      title: 'Studio Vidéo Le 40',
      descriptionHtml: `
        <h3>Studio vidéo avec fond vert professionnel</h3>
        <ul>
          <li>Fond vert 3x6m professionnel</li>
          <li>Kit d'éclairage LED RGB complet</li>
          <li>2 caméras Sony 4K</li>
          <li>Stabilisateurs et trépieds professionnels</li>
          <li>Espace de tournage 25m²</li>
          <li>Régie de contrôle incluse</li>
          <li>Moniteurs de retour HD</li>
        </ul>
        <p><strong>Prix dégressifs :</strong></p>
        <ul>
          <li>2 heures : 120€ (60€/h)</li>
          <li>4 heures : 220€ (55€/h) - Économie 8%</li>
          <li>8 heures : 400€ (50€/h) - Économie 17%</li>
        </ul>
      `,
      productType: 'Studio Location',
      vendor: 'Le 40',
      tags: ['studio', 'studio-video', 'location-horaire'],
      variants: [
        { title: '2 heures', price: '120.00', sku: 'STUDIO-VIDEO-2H' },
        { title: '4 heures (Demi-journée)', price: '220.00', sku: 'STUDIO-VIDEO-4H' },
        { title: '8 heures (Journée complète)', price: '400.00', sku: 'STUDIO-VIDEO-8H' },
      ],
    },
    {
      title: 'Studio Photo Le 40',
      descriptionHtml: `
        <h3>Studio photo modulable avec équipement professionnel</h3>
        <ul>
          <li>Cyclorama blanc professionnel</li>
          <li>Kit flash Profoto avec softbox</li>
          <li>Parapluies et diffuseurs multiples</li>
          <li>Fonds multiples (blanc/noir/gris)</li>
          <li>Espace shooting 30m²</li>
          <li>Zone maquillage et préparation</li>
          <li>Réflecteurs et accessoires</li>
        </ul>
        <p><strong>Prix dégressifs :</strong></p>
        <ul>
          <li>2 heures : 100€ (50€/h)</li>
          <li>4 heures : 180€ (45€/h) - Économie 10%</li>
          <li>8 heures : 320€ (40€/h) - Économie 20%</li>
        </ul>
      `,
      productType: 'Studio Location',
      vendor: 'Le 40',
      tags: ['studio', 'studio-photo', 'location-horaire'],
      variants: [
        { title: '2 heures', price: '100.00', sku: 'STUDIO-PHOTO-2H' },
        { title: '4 heures (Demi-journée)', price: '180.00', sku: 'STUDIO-PHOTO-4H' },
        { title: '8 heures (Journée complète)', price: '320.00', sku: 'STUDIO-PHOTO-8H' },
      ],
    },
  ];

  for (const productData of studiosProducts) {
    try {
      console.log(`📦 Création du produit: ${productData.title}...`);
      const product = await createStudioProduct(productData);
      console.log(`✅ Produit créé: ${product.title} (${product.id})`);
      console.log(`   Variants: ${product.variants.edges.length}`);
      product.variants.edges.forEach((v: any) => {
        console.log(`   - ${v.node.title}: ${v.node.price}€`);
      });

      await addProductToCollection(product.id, collection.id);
      console.log(`✅ Ajouté à la collection\n`);

      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Erreur lors de la création de ${productData.title}:`, error);
    }
  }

  console.log('\n✅ TERMINÉ ! Tous les produits Studios ont été créés.');
  console.log(`\n📍 Collection: ${collection.handle}`);
  console.log(`   ID: ${collection.id}`);
  console.log(`\n💡 Utilisez le hook: useShopifyCollection('${collection.handle}')`);
}

main().catch(console.error);
