import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const formations = [
    {
      title:
        'Développer son Audience : La stratégie derrière mes 4 MILLIARDS de vues en 2023 !',
      description:
        'La méthode la plus puissante pour créer une fidèle audience, récolter plusieurs nouveaux abonnés qualifiés et démultiplier ses ventes.',
      image:
        'https://www.benin.campusfrance.org/sites/pays/files/benin/styles/mobile_visuel_principal_page/public/formations%20pro.jpg?itok=Fb6u0xbO',
      price: 149.99,
      wholesalePrice: 79.99,
    },
    {
      title: 'Maîtriser le SEO : Dominez Google en 2024',
      description:
        'Découvrez les secrets pour optimiser votre site et améliorer votre classement sur Google avec des techniques SEO avancées.',
      image:
        'https://pedagoo.com/wp-content/uploads/2020/06/2250x1500_czy-warto-korzystac-ze-szkolen-online-ollh.jpg',
      price: 199.99,
      wholesalePrice: 109.99,
    },
    {
      title: 'Formation en Développement Web : Front-End et Back-End',
      description:
        'Apprenez les bases du développement web, du HTML/CSS au JavaScript, et maîtrisez les frameworks modernes comme React et Node.js.',
      image:
        'https://dropinblog.net/34253577/files/featured/formation_en_ligne.png',
      price: 329.99,
      wholesalePrice: 169.99,
    },
    {
      title: 'Photoshop pour Débutants : Créez des Visuels Époustouflants',
      description:
        'Apprenez à utiliser Adobe Photoshop pour retoucher des images et créer des visuels de qualité professionnelle.',
      image:
        'https://www.meformer.org/wp-content/uploads/2024/06/Comment-savoir-si-une-formation-en-ligne-est-fiable-.jpg',
      price: 120.0,
      wholesalePrice: 70.0,
    },
    {
      title: 'Initiation au Marketing Digital : Stratégies et Outils',
      description:
        'Explorez les outils et les stratégies de marketing digital pour promouvoir efficacement votre entreprise en ligne.',
      image:
        'https://www.redacteur.com/blog/wp-content/uploads/sites/6/2023/02/man-has-education-training-online-2021-10-20-00-45-14-utc-2-1024x683.jpg',
      price: 199.99,
      wholesalePrice: 99.99,
    },
  ];
  const result = await prisma.formation.createMany({
    data: formations,
  });

  console.log(result);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
