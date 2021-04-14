# Algorithmes de tri et optimisation de parcours de liste

## Dossier Algorithmes de tri
* Ce dossier contient une modélisation de différents algorithmes de tri dans le fichier `tri.js`. Les algorithmes de tri présents sont : tri à bulles, tri par insertion, tri par sélection, tri rapide, tri par fusion, tri par tas, tri de Shell.
* Les autres fichiers comprennent la définition d'une classe SortedArray, d'une fonction annexe "swap" qui permet d'inverser deux éléments dans un array, et 3 sets de données.
* 3 sets de données de longueurs différentes sont disponibles : `shortdata.txt`, `data.txt` et `longdata.txt`.
* Pour exécuter le programme, lancer la commande `$ node tri.js nom_du_set_de_données.txt` dans l'interface de commandes.
* Le programme produit un résultat composé des données dans le fichier `.txt` ordonnées par ordre croissant, ainsi que le nombre de passages nécessaires à l'algorithme sur des éléments de l'array pour produire le résultat.

## Dossier Optimisation de listes
* Ce dossier contient deux fichiers correspondant à deux scénarios, pour lesquels trois solutions sont disponibles : une de complexité O(n²) (avec deux boucles imbriquées), une de complexité O(n) (avec un enchaînement de boucles successives), et une qui ne comprend qu'un seul passage par élément du tableau.
* *Scénario 1* : Avec une liste de nombres entiers relatifs et un nombre k, crée une méthode retournant un booléen qui affiche si deux nombres de cette liste ont k comme résultat de leur somme. Par exemple, si je te donne la liste [10, 15, 3, 7] et k = 17, la fonction devra sortir true car 10 + 7 = 17. Si je te donne la liste [1, 8, 10, 21] et k = 19, la fonction devra sortir false car il n'y a pas deux nombres ayant 19 comme résultat de leur addition.
* *Scénario 2* : Nous allons te donner une liste contenant la hauteur (en étages) d'immeubles appartenant à une rue, d'est en ouest. Un agent immobilier voudrait que tu écrives un algorithme qui retourne combien de bâtiments de cette rue ont au moins un appartement avec une vue sur le soleil couchant (à l'ouest), afin de bien évaluer la valeur des bâtiments de la rue. Par exemple, avec la liste [3, 7, 8, 3, 6, 1], la fonction devrait retourner 3, puisque l'étage le plus haut des immeubles ayant comme taille 8, 6, et 1 ont tous une vue à l'ouest. Ou autre exemple la liste [1, 4, 5, 8] devrait te retourner 1 puisque seul le dernier bâtiment a au moins un appartement avec une vue à l'ouest.
* Pour exécuter le programme, lancer la commande `$ node exo0x.js` dans l'interface de commandes.