import * as cdk from "aws-cdk-lib";
import { IntisDnsStack } from "../lib/dns-stack";
import { InfraStack } from "../lib/infra-stack";

const app = new cdk.App();

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" };

/**
 * Dominio: una sola constante para los dos stacks.
 *
 * NO cambiar una vez desplegado: cambiar el nombre obliga a CloudFormation a
 * reemplazar la zona (otros 4 nameservers) y el dominio deja de resolver.
 * Es lo que le paso a Yalqui el 1 de septiembre. Protecciones: la zona tiene
 * RemovalPolicy.RETAIN y IntisDnsStack tiene terminationProtection.
 */
const DOMINIO = "intis.com";
const APP_DOMAIN = `app.${DOMINIO}`;

const dns = new IntisDnsStack(app, "IntisDnsStack", {
  env,
  domainName: DOMINIO,
  terminationProtection: true,
});

/**
 * El dominio no va detras de una bandera: el despliegue automatico corre
 * `cdk deploy --all` sin contexto extra, y cualquier condicion que dependa
 * de `-c` borraria certificado, CloudFront y DNS en el siguiente push.
 */
new InfraStack(app, "IntisStack", {
  env,
  appDomain: APP_DOMAIN,
  zone: dns.zone,
});