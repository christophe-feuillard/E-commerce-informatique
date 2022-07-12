<?php

namespace App\DataFixtures;

use Faker\Factory;
use Faker\Generator;
use App\Entity\Article;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class ArticleFixtures extends Fixture
{
        /**
     * @var Generator
     */
    private Generator $faker;

    public function __construct()
    {
        $this->faker = Factory::create('fr_FR');
    }
    public function load(ObjectManager $manager): void
    {
        $article1 = new Article();
        $article1->setTitre('Macbook Pro')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.01net.com/tests/test-du-macbook-pro-13-m1-apple-silicon-met-une-fessee-aux-puces-intel-et-promet-un-futur-radieux-6559.html')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100));

        $manager->persist($article1);

        $article2 = new Article();
        $article2->setTitre('Dell Latitude 3420')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3285552/20210910082316/ordinateur-portable-classique-inspiron-15-3510-1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100));

        $manager->persist($article2);

        
        $article3 = new Article();
        $article3->setTitre('Hp Pavillon')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3173496/20210120101301/pavilion_laptop_15-eh0006nf_-_gris_3_1200x1200.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100));

        $manager->persist($article3);

        $article4 = new Article();
        $article4->setTitre('GeForce RTX 3080 Ti GAMING X TRIO 12G')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3258783/20210601142016/geforce_rtx_3080_ti_ventus_3x_12g_oc_1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100));

        $manager->persist($article4);

        $article5 = new Article();
        $article5->setTitre('NITRO+ AMD Radeon™ RX 6900 XT SE')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3255819/20220208134940/nitro_amd_radeon_rx_6900_xt_se_1_1140x1140.png')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100));

        $manager->persist($article5);

        $article6 = new Article();
        $article6->setTitre('AORUS GeForce RTX™ 3070 Ti MASTER 8G')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3263410/20210604060616/gv-n307taorus_m-8gd_1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100));

        $manager->persist($article6);

        $manager->flush();

        $this->addReference('article_1', $article1);
        $this->addReference('article_2', $article2);
        $this->addReference('article_3', $article3);
        $this->addReference('article_4', $article4);
        $this->addReference('article_5', $article5);
        $this->addReference('article_6', $article6);
    }
}
