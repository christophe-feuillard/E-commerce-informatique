<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Faker\Factory;
use Faker\Generator;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class CategorieFixtures extends Fixture
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
        $categorie1 = new Categorie();
        $categorie1->setTitre('Ordinateur Portable');
        $categorie1->addArticle($this->getReference('article_1'));
        $categorie1->addArticle($this->getReference('article_2'));
        $categorie1->addArticle($this->getReference('article_3'));
        $categorie1->addArticle($this->getReference('article_11'));
        $categorie1->addArticle($this->getReference('article_12'));
        $categorie1->addArticle($this->getReference('article_13'));
        $categorie1->addArticle($this->getReference('article_14'));

        $manager->persist($categorie1);

        $categorie2 = new Categorie();
        $categorie2->setTitre('Carte Graphique');
        $categorie2->addArticle($this->getReference('article_4'));
        $categorie2->addArticle($this->getReference('article_5'));
        $categorie2->addArticle($this->getReference('article_6'));
        $categorie2->addArticle($this->getReference('article_7'));
        $categorie2->addArticle($this->getReference('article_8'));
        $categorie2->addArticle($this->getReference('article_9'));
        $categorie2->addArticle($this->getReference('article_10'));
        $manager->persist($categorie2);



        $manager->flush();
    }
}
