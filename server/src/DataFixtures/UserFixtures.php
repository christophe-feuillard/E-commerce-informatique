<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Faker\Generator;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserFixtures extends Fixture
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
        for ($i=1; $i <= 10; $i++) { 
            $user = new User();
            $user->setName($this->faker->lastName)
                ->setPassword($this->faker->md5)
                ->setEmail($this->faker->email)
                // ->setRoles($this->faker->bool)
                ->setVille($this->faker->city)
                ->setPhone($this->faker->phoneNumber)
                ->setAdresse($this->faker->streetAddress)
                ->setCodePostal($this->faker->postcode);
            $manager->persist($user);

        $manager->flush();
        }
    }
}
