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
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3203328/20210203082949/macbook_pro_myd92fna_-_gris_-_1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));


        $manager->persist($article1);

        $article2 = new Article();
        $article2->setTitre('Dell Latitude 3420')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3285552/20210910082316/ordinateur-portable-classique-inspiron-15-3510-1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));


        $manager->persist($article2);

        
        $article3 = new Article();
        $article3->setTitre('Hp Pavillon')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3173496/20210120101301/pavilion_laptop_15-eh0006nf_-_gris_3_1200x1200.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));


        $manager->persist($article3);

        $article4 = new Article();
        $article4->setTitre('GeForce RTX 3080 Ti GAMING X TRIO 12G')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3258783/20210601142016/geforce_rtx_3080_ti_ventus_3x_12g_oc_1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));


        $manager->persist($article4);

        $article5 = new Article();
        $article5->setTitre('NITRO+ AMD Radeon™ RX 6900 XT SE')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3255819/20220208134940/nitro_amd_radeon_rx_6900_xt_se_1_1140x1140.png')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));


        $manager->persist($article5);

        $article6 = new Article();
        $article6->setTitre('AORUS GeForce RTX™ 3070 Ti MASTER 8G')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3263410/20210604060616/gv-n307taorus_m-8gd_1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));


        $manager->persist($article6);

        $article7 = new Article();
        $article7->setTitre('EVGA - GeForce RTX 3090 XC3 ULTRA GAMING - Triple Fan - 24Go')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/medias/2f31a91d12fd3b46a117d18f8005b80a/p_1000x1000/geforce-rtx-3090-xc3-ultra-gaming-triple-fan-24go-1.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article7);

        $article8 = new Article();
        $article8->setTitre('ZOTAC - GeForce RTX 3090 Trinity OC 24Go')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3209032/20210113122635/zotac_geforce_rtx_3090_trinity_oc_1_1200x1200.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article8);

        $article9 = new Article();
        $article9->setTitre('GIGABYTE - AORUS GeForce RTX™ 3070 Ti MASTER 8G')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3263410/20210604060616/gv-n307taorus_m-8gd_1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article9);

        $article10 = new Article();
        $article10->setTitre('MSI - GeForce RTX 3070 Ti GAMING X TRIO 8Go LHR')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3260694/20220614025413/CG%20RTX%201_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article10);

        $article11 = new Article();
        $article11->setTitre('MSI - Raider GE76 12UH-094FR')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3363082/20220120115654/raider-ge76-12uh-094fr-1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article11);

        $article12 = new Article();
        $article12->setTitre('ASUS - TUF GAMING - DASH-TUF516PM-HN206W ')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3352194/20211118055631/dash-tuf516pm-hn951w-gris-eclipse-1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article12);

        $article13 = new Article();
        $article13->setTitre('LENOVO - Legion 5 - 15ACH6H - Phantom Blue + Premium Care 2ans')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3250665/20210514110728/legion_5_-_15ach6h_-_phantom_blue_3_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article13);

        $article14 = new Article();
        $article14->setTitre('ACER - Nitro 5 AN515-45-R3HA')
        ->setPrix($this->faker->numberBetween($min = 50, $max = 1200))
        ->setPhoto('https://www.rueducommerce.fr/media/images/web/produit/3274410/20210929130224/pc-gamer-nitro-5-an515-45-r3ha-1_1140x1140.jpg')
        ->setCaracteristique($this->faker->paragraph(2))
        ->setDescription($this->faker->text($maxNbChars = 100))
        ->setWidth($this->faker->numberBetween($min = 10, $max = 120))
        ->setLenght($this->faker->numberBetween($min = 10, $max = 120))
        ->setHeight($this->faker->numberBetween($min = 10, $max = 120))
        ->setWeight($this->faker->numberBetween($min = 5, $max = 10));

        $manager->persist($article14);

        $manager->flush();

        $this->addReference('article_1', $article1);
        $this->addReference('article_2', $article2);
        $this->addReference('article_3', $article3);
        $this->addReference('article_4', $article4);
        $this->addReference('article_5', $article5);
        $this->addReference('article_6', $article6);
        $this->addReference('article_7', $article7);
        $this->addReference('article_8', $article8);
        $this->addReference('article_9', $article9);
        $this->addReference('article_10', $article10);
        $this->addReference('article_11', $article11);
        $this->addReference('article_12', $article12);
        $this->addReference('article_13', $article13);
        $this->addReference('article_14', $article14);
    }
}
