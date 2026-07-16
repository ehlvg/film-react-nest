import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  describe('formatMessage', () => {
    it('формирует строку JSON с полями level, message, optionalParams', () => {
      const result = logger.formatMessage('log', 'hello');
      const parsed = JSON.parse(result);
      expect(parsed.level).toBe('log');
      expect(parsed.message).toBe('hello');
      expect(parsed.optionalParams).toEqual([]);
    });

    it('включает дополнительные параметры в optionalParams', () => {
      const result = logger.formatMessage('warn', 'hello', 'extra1', 42);
      const parsed = JSON.parse(result);
      expect(parsed.level).toBe('warn');
      expect(parsed.message).toBe('hello');
      expect(parsed.optionalParams).toEqual(['extra1', 42]);
    });
  });

  describe('log', () => {
    it('вызывает console.log с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('test message');
      expect(spy).toHaveBeenCalledTimes(1);
      const [output] = spy.mock.calls[0];
      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('log');
      expect(parsed.message).toBe('test message');
      spy.mockRestore();
    });
  });

  describe('error', () => {
    it('вызывает console.error с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('error message');
      expect(spy).toHaveBeenCalledTimes(1);
      const [output] = spy.mock.calls[0];
      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('error');
      expect(parsed.message).toBe('error message');
      spy.mockRestore();
    });
  });

  describe('warn', () => {
    it('вызывает console.warn с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('warn message');
      expect(spy).toHaveBeenCalledTimes(1);
      const [output] = spy.mock.calls[0];
      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('warn');
      spy.mockRestore();
    });
  });

  describe('debug', () => {
    it('вызывает console.debug с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('debug message');
      expect(spy).toHaveBeenCalledTimes(1);
      const [output] = spy.mock.calls[0];
      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('debug');
      spy.mockRestore();
    });
  });

  describe('verbose', () => {
    it('вызывает console.log с отформатированным сообщением уровня verbose', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.verbose('verbose message');
      expect(spy).toHaveBeenCalledTimes(1);
      const [output] = spy.mock.calls[0];
      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('verbose');
      spy.mockRestore();
    });
  });

  describe('fatal', () => {
    it('вызывает console.error с отформатированным сообщением уровня fatal', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.fatal('fatal message');
      expect(spy).toHaveBeenCalledTimes(1);
      const [output] = spy.mock.calls[0];
      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('fatal');
      spy.mockRestore();
    });
  });
});
