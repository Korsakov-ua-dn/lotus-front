export const getActualTraidingData = (start: number, timeOffset: number, finish: number, biddersCount: number) => {
    const nowUtc = new Date().getTime() - timeOffset; 
    const tradingIsActive =  nowUtc < finish && nowUtc > start
  
    if (!tradingIsActive) {
      return {tradingIsActive, activeBidder: 0, minuteLeft: 0, secondLeft: 0}
    }
  
    const timePassedMS = nowUtc - start; // прошло времени с момента начала торгов в мс
    const circulCount = timePassedMS / 1000 / 60 / 2; // количество кругов по 2 мин
    const activeBidder = Math.ceil(circulCount % biddersCount); // номер участника торгов чей ход
    const timerLeftSec = Math.floor(2 * 60 - ((timePassedMS / 1000) % (2 * 60))); // время в секундах которое осталось от 2 мин. таймера
    const minuteLeft = Math.floor(timerLeftSec / 60); // только минуты
    const secondLeft = timerLeftSec % 60; // только секунды
    
    return { tradingIsActive, activeBidder, minuteLeft, secondLeft };
  }
  
  // types
  export type TradingDataType = ReturnType<typeof getActualTraidingData>;