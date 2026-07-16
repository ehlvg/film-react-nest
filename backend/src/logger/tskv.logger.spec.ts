import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  describe('formatMessage', () => {
    it('формирует TSKV-строку с полями level и message, разделёнными табом', () => {
      const result = logger.formatMessage('log', 'hello');
      expect(result).toBe('level=log\tmessage=hello');
    });

    it('включает optionalParams, если они переданы', () => {
      const result = logger.formatMessage('warn', 'hello', 'extra');
      expect(result).toBe(
        'level=warn\tmessage=hello\toptionalParams=["extra"]',
      );
    });

    it('не добавляет optionalParams при их отсутствии', () => {
      const result = logger.formatMessage('error', 'oops');
      expect(result).not.toContain('optionalParams');
    });

    it('сериализует объект в message', () => {
      const result = logger.formatMessage('log', { key: 'value' });
      expect(result).toBe('level=log\tmessage={"key":"value"}');
    });

    it('сериализует несколько параметров в optionalParams', () => {
      const result = logger.formatMessage('log', 'hi', 1, 'two');
      expect(result).toBe('level=log\tmessage=hi\toptionalParams=[1,"two"]');
    });
  });

  describe('log', () => {
    it('вызывает console.log с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('test message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe('level=log\tmessage=test message');
      spy.mockRestore();
    });
  });

  describe('error', () => {
    it('вызывает console.error с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('error message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe('level=error\tmessage=error message');
      spy.mockRestore();
    });
  });

  describe('warn', () => {
    it('вызывает console.warn с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('warn message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe('level=warn\tmessage=warn message');
      spy.mockRestore();
    });
  });

  describe('debug', () => {
    it('вызывает console.debug с отформатированным сообщением', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('debug message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe('level=debug\tmessage=debug message');
      spy.mockRestore();
    });
  });

  describe('verbose', () => {
    it('вызывает console.log с отформатированным сообщением уровня verbose', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.verbose('verbose message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe(
        'level=verbose\tmessage=verbose message',
      );
      spy.mockRestore();
    });
  });

  describe('fatal', () => {
    it('вызывает console.error с отформатированным сообщением уровня fatal', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.fatal('fatal message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toBe('level=fatal\tmessage=fatal message');
      spy.mockRestore();
    });
  });
});
