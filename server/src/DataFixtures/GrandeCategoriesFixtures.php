<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class GrandeCategoriesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categorie1 = new Categorie();
        $categorie1->setTitre('Ordinateur Portable');
        $categorie1->addArticle($this->getReference('article_1'));

        $manager->persist($categorie1);

        $manager->flush();
    }
}
