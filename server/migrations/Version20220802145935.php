<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220802145935 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE payment (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, adresse_id INT DEFAULT NULL, payment_type DATETIME NOT NULL, amount DOUBLE PRECISION NOT NULL, INDEX IDX_6D28840DA76ED395 (user_id), INDEX IDX_6D28840D4DE7DC5C (adresse_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE payments (id INT AUTO_INCREMENT NOT NULL, adress_id INT DEFAULT NULL, INDEX IDX_65D29B328486F9AC (adress_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE physical_adresses (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, street_number INT DEFAULT NULL, street VARCHAR(255) NOT NULL, zip_code VARCHAR(255) DEFAULT NULL, country VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_AAD2C18FA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE payment ADD CONSTRAINT FK_6D28840D4DE7DC5C FOREIGN KEY (adresse_id) REFERENCES physical_adresses (id)');
        $this->addSql('ALTER TABLE payments ADD CONSTRAINT FK_65D29B328486F9AC FOREIGN KEY (adress_id) REFERENCES physical_adresses (id)');
        $this->addSql('ALTER TABLE physical_adresses ADD CONSTRAINT FK_AAD2C18FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD country VARCHAR(255) DEFAULT NULL, ADD ban_methode VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE payment DROP FOREIGN KEY FK_6D28840D4DE7DC5C');
        $this->addSql('ALTER TABLE payments DROP FOREIGN KEY FK_65D29B328486F9AC');
        $this->addSql('DROP TABLE payment');
        $this->addSql('DROP TABLE payments');
        $this->addSql('DROP TABLE physical_adresses');
        $this->addSql('ALTER TABLE user DROP country, DROP ban_methode');
    }
}
