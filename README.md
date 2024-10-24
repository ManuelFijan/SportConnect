# SportConnect

# Programsko inženjerstvo 

# Opis projekta
Ovaj projekt je reultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Cilj našeg projekta je razviti aplikaciju SportConnect, društvenu mrežu koja povezuje klijente i trenere/profesionalce iz područja sporta, fitnessa i zdrave prehrane. Naša motivacija je olakšati pristup kvalitetnim informacijama i savjetima o zdravom načinu života, omogućujući korisnicima da pronađu trenere i sadržaje prilagođene svojim potrebama, uz povoljnije cijene od individualnih usluga trenera i nutricionista.

Aplikacija nudi različite pretplatne planove koji omogućuju pristup blogovima, savjetima i planovima profesionalaca iz raznih područja zdravog života, a također omogućava direktnu komunikaciju između korisnika i stručnjaka putem poruka i notifikacija.

# Funkcijski zahtjevi
> AKTORI; 
- aktivni; korisnici (klijenti, partneri), admin 
- pasivni; baza podataka

> FUNKCIJSKI ZAHTJEVI; 
*pristup informacija same aplikacije -> svi aktivni korisnici (klijenti, partneri i admini)
*stvaranje profila/prijava -> klijenti i partneri
spremanje i označavanje objava -> klijenti i partneri
komunikacija sa ostalim korisnicima -> klijenti i partneri
spremanje i označavanje drugih objava -> klijenti i partneri
odabiranje i otkazivanje ranga za plaćanje -> klijenti i partneri (brončanog i srebrnog ranga)
uplate -> klijenti i partneri (brončanog i srebrnog ranga)

kreiranje i uređivanje plaćenih objava -> partneri
kreiranje i uređivanje besplatnih objava -> partneri
isplate -> partneri

odabiranje besplatnog ranga -> klijenti

adminsko brisanje sadržaja -> admin
adminsko filtriranje rangova -> admin

# Tehnologije
Front-end: React

Back-end: Spring

Baza podataka: PostgreSQL

Autentifikacija: OAuth 2.0/Firebase Authentication

Notifikacije i poruke: Firebase Cloud Messaging/FreeChat

Deployment: Render ili Heroku

Plaćanje: PayPal/Stripe

# Članovi tima 
| Ime člana | Područje rada | 
|----------|----------|
| Klara Katić | Dizajn, baza podataka, frontend | 
| Hana Čerić | Baza podataka, backend | 
| Vid Knežević | Frontend | 
| Luka Zuanović | Frontend | 
| Luka Đuretić | Frontend, backend | 
| Viktor Pijanec | Backend, baza podataka | 
| Manuel Fijan | Backend, baza podataka | 

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.

# 📝 Licenca

## License Overview

This project contains components under different licenses:

- **Code**: All software code in this project is licensed under the MIT License.
- **Educational Content**: Documentation, blog posts, fitness plans, and recipes are licensed under the Creative Commons BY-NC-SA 4.0 license.
- **Images and Multimedia**: All images, models, and media are licensed under the CC0 1.0 Universal license.

## License for Code

All the software code in this repository is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Copyright (c) [2024] [SportConnect]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

## License for Educational Content

The educational content in this repository, including documentation, blog posts, fitness plans, and recipes, is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

![License](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

You are free to:

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

## License for Images and Other Media

All images, models, and other multimedia files in this repository are licensed under the [CC0 1.0 Universal License](https://creativecommons.org/publicdomain/zero/1.0/).

![License](https://licensebuttons.net/l/zero/1.0/88x31.png)

This means you can copy, modify, distribute, and perform the work, even for commercial purposes, all without asking permission.




[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
