<?php

namespace App\Repository;

use App\Entity\PhysicalAdresses;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PhysicalAdresses>
 *
 * @method PhysicalAdresses|null find($id, $lockMode = null, $lockVersion = null)
 * @method PhysicalAdresses|null findOneBy(array $criteria, array $orderBy = null)
 * @method PhysicalAdresses[]    findAll()
 * @method PhysicalAdresses[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PhysicalAdressesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PhysicalAdresses::class);
    }

    public function add(PhysicalAdresses $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PhysicalAdresses $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return PhysicalAdresses[] Returns an array of PhysicalAdresses objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PhysicalAdresses
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
