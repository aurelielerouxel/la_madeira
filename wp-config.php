<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en « wp-config.php » et remplir les
 * valeurs.
 *
 * Ce fichier contient les réglages de configuration suivants :
 *
 * Réglages MySQL
 * Préfixe de table
 * Clés secrètes
 * Langue utilisée
 * ABSPATH
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'la_madeira' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', '' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/**
 * Type de collation de la base de données.
 * N’y touchez que si vous savez ce que vous faites.
 */
define( 'DB_COLLATE', '' );

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'bVO mDc78gDd;GmNGx01*$?0)1}!mC|9YLn`@2vE_65z1)T|iWe3:a/Z6h=OK9KB' );
define( 'SECURE_AUTH_KEY',  'WR?#j|!PsUfSLUI+5LsN#m3~$d=s4m w01i?6xek&e4.M,0hIz9p/B+*s8euMoQ[' );
define( 'LOGGED_IN_KEY',    'RuUARt|&lV0;s-0[O<-KAh2Nk`tEVn3UK^_`1<eY2qWr?Ye3R#*egE[DwCYQjl<0' );
define( 'NONCE_KEY',        '?LU OvcTQ&joylRX1jzF$sJY(K_JXDn,iW# Y*TI;+{MW:BD=9-O>@SMkT|BVEF}' );
define( 'AUTH_SALT',        'V)m+Sci,28^e.~Gpwrz[58UK&YB1C:+u`-Vr^5(|ymCOc?fRUi%fodfz.UR.]a=`' );
define( 'SECURE_AUTH_SALT', 'go5)VZf]p}jCNtNie~@kt@Ai <fdw*ZA$c+rQ1?_}t3I49Z2c>Ywd?8e_YsAAR7i' );
define( 'LOGGED_IN_SALT',   '2|(KyPz- g4TYaq]VbS}|k=+:9TWEP7s0v-(j6[2o--*FNLcwC<jjB3u|DNa+;A3' );
define( 'NONCE_SALT',       ']ZoC<Eca3gS+Q0?0vPi;1Vo;]kX#D>%(G3f~)F`GK44W{WH?NxA(A!A-%IpdibUr' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( ! defined( 'ABSPATH' ) )
  define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once( ABSPATH . 'wp-settings.php' );
