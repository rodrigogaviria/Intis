import { Stack, StackProps, CfnOutput, Fn, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as route53 from "aws-cdk-lib/aws-route53";

export interface IntisDnsStackProps extends StackProps {
  domainName: string;
}

export class IntisDnsStack extends Stack {
  public readonly zone: route53.IHostedZone;

  constructor(scope: Construct, id: string, props: IntisDnsStackProps) {
    super(scope, id, props);

    const zone = new route53.PublicHostedZone(this, "Zone", {
      zoneName: props.domainName,
    });

    // RETAIN: si la zona se reemplaza (cambio de nombre) o se borra el stack,
    // CloudFormation NO elimina la zona existente. Evita lo que paso en Yalqui.
    zone.applyRemovalPolicy(RemovalPolicy.RETAIN);

    this.zone = zone;

    new CfnOutput(this, "NameServers", {
      value: Fn.join(", ", zone.hostedZoneNameServers!),
      description: "Copia estos 4 nameservers y configuralos en el registrador del dominio",
    });
  }
}
