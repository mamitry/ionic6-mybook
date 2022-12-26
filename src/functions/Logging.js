export const DebugLevel = Object.freeze({
  HOOKS: { name: "HOOKS", enabled: false },
  ROUTER: { name: "ROUTER", enabled: false },
  SCROLL: { name: "SCROLL", enabled: false },
  DEBUG: { name: "DEBUG", enabled: true },
  INFO: { name: "INFO", enabled: true },
  WARN: { name: "WARN", enabled: true },
  ERROR: { name: "ERROR", enabled: true },
  FATAL: { name: "FATAL", enabled: true },
});

/**
 *
 * logging
 */
export function appLog(level, component, message, object) {
  if (!level.enabled) return;
  const objectOutput = object != undefined ? object : " ";
  switch (level.name) {
    case "WARN":
      console.warn(level.name, component, message, objectOutput);
      break;

    case "ERROR":
      console.error(level.name, component, message, objectOutput);
      break;

    case "DEBUG":
      console.debug(level.name, component, message, objectOutput);
      break;

    case "INFO":
      console.info(level.name, component, message, objectOutput);
      break;

    default:
      console.log(level.name, component, message, objectOutput);
      break;
  }
}
