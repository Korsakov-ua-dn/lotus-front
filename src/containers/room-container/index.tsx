import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BiddersTable from "../../components/bidders-table";
import LayoutModal from "../../components/layout-modal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { actions } from "../../store/activity-slice";
import { getActualTraidingData, TradingDataType } from "../../utils/get-actual-trading-data";

const RoomContainer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const select = useAppSelector((state) => ({
    current: state.activity.current,
    loading: state.activity.loading,
    error: state.activity.error,
  }));

  const [tradingData, setTradingData] = useState<TradingDataType>();

  const callbacks = {
    onClose: useCallback(() => { 
      dispatch(actions.removeCurrent())
      navigate("/activity") 
    }, [navigate, dispatch]),
  };

  // (+select.current.startDate)
  // мок данные для тестирования
  // const start = useMemo(() => new Date(2022, 11, 9, 11, 2, 0).getTime(), []);
  // const finish = useMemo(() => new Date(2022, 11, 9, 12, 11, 0).getTime(), []);

  // useLayoutEffect перерендером каждую секунду только если торги на момент перехода в комнату были активны
  // useLayoutEffect(() => {
  //   if (select.current) {
  //     const data = getActualTraidingData(
  //             (+select.current.startDate), 
  //             select.current.timeOffset, 
  //             (+select.current.expDate), 
  //             select.current.bidders.length
  //             );
      
  //     if (!tradingData) {
  //         setTradingData(data);
  //     } // запуск счетчика на старте пока tradingData не инициализирован

  //     if (tradingData?.tradingIsActive) {
  //       setTimeout(() => {
  //         setTradingData(data);
  //       }, 1000);
  //     }

  //   }
  // }, [select, tradingData]);

  // useLayoutEffect с перерендером каждую секунду => позволяет реагировать на начало и окончание торгов 
  useLayoutEffect(() => {
    if (select.current) {
      const data = getActualTraidingData(
        (+select.current.startDate), 
        select.current.timeOffset, 
        (+select.current.expDate), 
        select.current.bidders.length
        );

        if (!tradingData) {
          setTradingData(data);
        } // запуск счетчика на старте пока tradingData не инициализирован
      
        setTimeout(() => {
          setTradingData(data);
        }, 1000);

    }
  }, [select, tradingData]);

  return (
    <LayoutModal  title={`Ход торгов ${select.current ? select.current.title : ""}`}
                  onClose={callbacks.onClose}
                  labelClose={"Закрыть"}
    >
      { select.loading && "Загрузка информации..." }
      
      {!select.loading && select.error}

      { tradingData && !tradingData.tradingIsActive && "Торги в текущий момент не активны" }

      { 
        select.current && 
        !select.loading && 
        tradingData?.tradingIsActive && 
        <BiddersTable selectActivity={select.current}
                      tradingData={tradingData}
        />
      }
    </LayoutModal>
  );
};

export default React.memo(RoomContainer);
