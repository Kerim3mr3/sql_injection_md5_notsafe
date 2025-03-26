# SQL Injection MD5 Not Safe

## Proje Hakkında

Bilişim Güvenliği Teknolojileri bölümü öğrencileri olarak **Kriptoloji** dersinde, güvensiz şifreleme algoritmalarının veri tabanında kullanılması sonucu doğurabileceği güvenlik zaafiyetlerini SQL Injection güvenlik zafiyeti üzerinden göstermeyi amaçladık. Bu projede, **MD5** şifreleme algoritmasının SQL Injection saldırılarıyla nasıl güvenlik açığı oluşturduğunu ve bu açığın nasıl istismar edilebileceğini inceleyeceğiz.

---

## Proje Amacı

Bu proje, güvensiz bir şekilde uygulama içinde MD5 gibi kırılgan şifreleme algoritmalarının kullanımının güvenlik risklerini vurgulamaktadır. **SQL Injection** saldırıları kullanılarak veritabanındaki şifreler kırılmaya çalışılacak ve veri tabanındaki hassas bilgilere ulaşılabilecektir. Proje, bu tür saldırılardan korunma yolları üzerine bir farkındalık yaratmayı hedeflemektedir.

---

## Kullanılan Araçlar ve Teknolojiler

- **MD5 (Message Digest Algorithm 5):** Güvensiz şifreleme algoritması olarak kullanılmaktadır.
- **SQLMap:** SQL Injection zafiyetlerini keşfetmek ve istismar etmek için kullanılan bir açık kaynak aracı.
- **Hashcat:** Şifre çözme (cracking) aracı, şifreli veriler üzerinde brute force saldırıları gerçekleştirerek zayıf şifreleme algoritmalarını çözmek için kullanılır.

---

## Proje Görselleri

Aşağıda projenin çalışmasıyla ilgili bazı görseller yer almaktadır:

![SQL Injection Görseli](path/to/sql_injection_image.png)
*SQL Injection Saldırısı*

![MD5 Hash Görseli](path/to/md5_hash_example.png)
*MD5 Hash Örneği*

![Hashcat Kullanımı](path/to/hashcat_image.png)
*Hashcat Aracı Kullanımı*

![SQLMap Kullanımı](path/to/sqlmap_image.png)
*SQLMap Aracı Kullanımı*

---

## Kullanım Talimatları

### 1. Gereksinimler
Projeyi çalıştırabilmek için aşağıdaki yazılımların sisteminizde kurulu olması gerekmektedir:

- Python 3.x
- SQLMap (https://github.com/sqlmapproject/sqlmap)
- Hashcat (https://hashcat.net/hashcat/)

### 2. Kurulum

Projenin kullanılabilir olması için öncelikle gerekli dosyaları ve araçları kurmanız gerekmektedir.

```bash
git clone https://github.com/Kerim3mr3/sql_injection_md5_notsafe.git
cd sql_injection_md5_notsafe
