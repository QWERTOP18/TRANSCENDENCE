import { Injectable, LoggerService } from '@nestjs/common';
import * as http from 'http';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private context?: string;
  private readonly logstashUrl: string;
  private readonly isDevelopment: boolean;

  constructor() {
    this.logstashUrl = 'http://logstash:5100';
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  setContext(context: string) {
    this.context = context;
  }

  private async sendToLogstash(level: string, message: string, meta?: any) {
    if (this.isDevelopment) {
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      ...meta,
    };

    const options = {
      hostname: 'logstash',
      port: 5100,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', resolve);
      });

      req.on('error', (error) => {
        console.error('Failed to send log to Logstash:', error);
        reject(error);
      });

      req.write(JSON.stringify(logEntry));
      req.end();
    });
  }

  log(message: string, context?: string) {
    if (context) this.setContext(context);
    console.log(`[${this.context}] ${message}`);
    this.sendToLogstash('info', message).catch(() => {});
  }

  error(message: string, trace?: string, context?: string) {
    if (context) this.setContext(context);
    console.error(`[${this.context}] ${message}`, trace);
    this.sendToLogstash('error', message, { trace }).catch(() => {});
  }

  warn(message: string, context?: string) {
    if (context) this.setContext(context);
    console.warn(`[${this.context}] ${message}`);
    this.sendToLogstash('warn', message).catch(() => {});
  }

  debug(message: string, context?: string) {
    if (context) this.setContext(context);
    console.debug(`[${this.context}] ${message}`);
    this.sendToLogstash('debug', message).catch(() => {});
  }

  verbose(message: string, context?: string) {
    if (context) this.setContext(context);
    console.log(`[${this.context}] ${message}`);
    this.sendToLogstash('verbose', message).catch(() => {});
  }
}
