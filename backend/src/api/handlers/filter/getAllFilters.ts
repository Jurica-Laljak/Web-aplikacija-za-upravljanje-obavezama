import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import {
  SizeFilterDto,
  PrefixFilterDto,
  PriorityFilterDto,
  TimePeriodFilterDto,
} from "../../../../../shared/filter/Filter.dto";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import query from "../../../database/query";
import { AllFilters } from "../../../interfaces/filter/AllFilters";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllFilters(
  req: Request,
  res: Response<AllFilters, TokenAttributes>,
  next: NextFunction
) {
  var returnArray: AllFilters = {
    sizefilters: [],
    prefixfilters: [],
    priorityfilters: [],
    timeperiodfilters: [],
  };
  // select sizefilters
  try {
    var sizeFilters = await query<SizeFilterDto>(`SELECT f.*,
		sf.size
		
    FROM filter f JOIN sizefilter sf
		ON f.filterid = sf.filterid

    WHERE f.userid = ${res.locals.userId}`);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // select prefixfilters
  try {
    var prefixFilters = await query<PrefixFilterDto>(`SELECT f.*,
		pf.prefix
		
    FROM filter f JOIN prefixfilter pf
		ON f.filterid = pf.filterid

    WHERE f.userid = ${res.locals.userId}`);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // select priorityfilters
  try {
    var priorityFilters = await query<PriorityFilterDto>(`SELECT f.*,
		pf.lowerbound,
    pf.higherbound
		
    FROM filter f JOIN priorityfilter pf
		ON f.filterid = pf.filterid

    WHERE f.userid = ${res.locals.userId}`);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // select timeperiodfilters
  try {
    var timePeriodFilters = await query<TimePeriodFilterDto>(`SELECT f.*,
		tpf.lowerbound AS lowerbound,
    tpf.higherbound AS higherbound
		
    FROM filter f JOIN timeperiodfilter tpf
		ON f.filterid = tpf.filterid

    WHERE f.userid = ${res.locals.userId}`);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // merge all data and send to client
  returnArray.sizefilters = [...sizeFilters];
  returnArray.timeperiodfilters = [...timePeriodFilters];
  returnArray.prefixfilters = [...prefixFilters];
  returnArray.priorityfilters = [...priorityFilters];
  res.send(returnArray);
}
