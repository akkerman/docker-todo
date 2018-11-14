# docker-todo

voorbeeld applicatie in docker containers

## Install

Om dit aan de praat te krijgen moeten er een aantal zaken gebeuren.

NB: het maken van een swarm en een registry HOEFT niet.
De locale docker daemon kun je ook in swarm modus zetten alle commandos werken dan ook, er is dan alleen geen volledig cluster.

### installeer docker, virtualbox en vagrant

installeer docker, virtualbox en vagrant

clone de swarm repository https://github.com/akkerman/vagrant-docker-swarm

### installeer een local docker registry

check https://hub.docker.com/_/registry/

    docker run -d -p 5000:5000 --restart always --name registry registry:2

Nu is de registry beschikbaar op localhost en kun je em dus locaal gebruiken.
Omdat we deze willen delen met het cluster moeten we het ip gebruiken van de machine waar alles op draait.
Dit ip wil nog wel eens wijzigen gebruik daarom het ip van het private netwerk van virtualbox.

| machine | ip               | omschrijving                                 |
| ---     | ---              | ---                                          |
| host    | 192.168.20.1     | de laptop pc waarop alles draait             |
| manager | 192.168.20.120   | een vm, de manager node                      |
| worker1 | 192.168.20.121   | een vm, een worker node                      |
| worker2 | 192.168.20.122   | een vm, een worker node                      |
| workerN | 192.168/20.120+N | additionele VMs, pas de N aan in Vagrantfile |

### edit ip adres van local registry

Omdat de registry nu niet localhost is wordt deze door de docker daemon niet vertrouwd.
Daarom moet het file `/etc/docker/daemon.json` worden aangepast / gemaakt.

    { "insecure-registries":["192.168.20.1:5000"] }

Zie, ter referentie, het bestand `./provisioning/roles/docker/files/daemon.json` in de swarm repo

### start 3 vms en maak swarm cluster

volg instructies in README van vagrant-docker-swarm

## Stuff


