import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { InfraStack } from "../lib/infra-stack";

const app = new cdk.App();

const env = { account: process.env.CDK_DEFAULT_ACCOUNT, region: "us-east-1" };

/**
 * Zona fruba.co: ya existe y la comparten otros proyectos (app.fruba.co,
 * app.arrozpaisa.fruba.co...). Se referencia por ID y NUNCA se declara aqui:
 * declararla haria que CloudFormation intente crear y controlar otra zona
 * fruba.co. Intis solo agrega sus propios registros dentro de ella
 * (intis.fruba.co y el CNAME de validacion del certificado).
 */
const zone = route53.HostedZone.fromHostedZoneAttributes(app, "ZonaFruba", {
  hostedZoneId: "Z05672032C372LAJON2MY",
  zoneName: "fruba.co",
});

/**
 * El dominio no va detras de una bandera: el despliegue automatico corre
 * `cdk deploy --all` sin contexto extra, y cualquier condicion que dependa
 * de `-c` borraria certificado, CloudFront y DNS en el siguiente push.
 *
 * Si el dominio cambia en el futuro, se cambia solo appDomain (y zone si es
 * otra zona). Se recrean certificado, CloudFront y registros DNS; la base de
 * datos y las Lambdas no se tocan. NO cambiar el nombre "IntisStack": eso
 * recrearia todo, incluida la base de datos.
 */
new InfraStack(app, "IntisStack", {
  env,
  appDomain: "intis.fruba.co",
  zone,
});