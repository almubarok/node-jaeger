const {
  SimpleSpanProcessor,
} = require('@opentelemetry/tracing')
const {
  trace,
  context,
} = require("@opentelemetry/api");

const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const opentelemetry = require('@opentelemetry/sdk-node')
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')

const serviceName = 'nodejs-jaeger-demo';

const initTracing = async () => {
  const traceExporter = new JaegerExporter({
    tags: [],
    endpoint: 'http://localhost:14268/api/traces'
  })

  const sdk = new opentelemetry.NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
    spanProcessor: new SimpleSpanProcessor(traceExporter),
  });

  try {
    await sdk.start();
    console.log("Tracing initialized");
  } catch (error) {
    console.log("Error initializing tracing", error);
  }
}

const startSpan = (op, _ctx) => {
  let ctx;
  if (_ctx) {
    const tmpCtx = context.active();
    ctx = trace.setSpanContext(tmpCtx, _ctx);
    return trace.getTracer(serviceName).startSpan(op, {}, ctx);
  }
  return trace.getTracer(serviceName).startSpan(op);
};

module.exports = {
  initTracing,
  startSpan
}