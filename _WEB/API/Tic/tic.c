//RFI TAG:alias=useTIC,6
//RFI TAG:driverDefineList=Tic
//RFI TAG:driverName=TIMER
/*************************************************************************//**

  @file     tic.c

  @brief    Driver Library to use TIC

  @author   Pablo Llull (PL)

  @version  20200604 v0.0.1   PL Initial release.
 ******************************************************************************/
 

 /*==================[inclusions]=============================================*/

#include "../inc/tic.h"

/*==================[macros and definitions]=================================*/

/*==================[internal data declaration]==============================*/

/*==================[internal functions declaration]=========================*/

/*==================[internal data definition]===============================*/

uint32	time1_ms = 0; 
uint32	time2_ms = 0; 
uint32	time3_ms = 0; 
uint32	time4_ms = 0; 
uint32	time5_ms = 0; 
uint32	time6_ms = 0; 

uint32	setPoint1_ms = 0; 
uint32	setPoint2_ms = 0; 
uint32	setPoint3_ms = 0; 
uint32	setPoint4_ms = 0; 
uint32	setPoint5_ms = 0; 
uint32	setPoint6_ms = 0; 

char modo_timer1;
char modo_timer2;
char modo_timer3;
char modo_timer4;
char modo_timer5;
char modo_timer6;

/*==================[external data definition]===============================*/

/*==================[internal functions definition]==========================*/


/*==================[external functions definition]==========================*/

void init_tic(void)
{	

}
doInit(init_tic)

#ifdef use_setTime1_function
/**
 * @brief
 */
void setTime1(void)
{
	setPoint1_ms = atoll(ptr_param[0]);
	modo_timer1 = *ptr_param[1];
	time1_ms =  timeStamp;
}
doCMDf(setTime1)
#endif

#ifdef use_setTime2_function
/**
 * @brief
 */
void setTime2(void)
{
	setPoint2_ms = atoll(ptr_param[0]);
	modo_timer2 = *ptr_param[1];
	time2_ms =  timeStamp;
}
doCMDf(setTime2)
#endif

#ifdef use_setTime3_function
/**
 * @brief
 */
void setTime3(void)
{
	setPoint3_ms = atoll(ptr_param[0]);
	modo_timer3 = *ptr_param[1];
	time3_ms =  timeStamp;
}
doCMDf(setTime3)
#endif

#ifdef use_setTime4_function
/**
 * @brief
 */
void setTime4(void)
{
	setPoint4_ms = atoll(ptr_param[0]);
	modo_timer4 = *ptr_param[1];
	time4_ms =  timeStamp;
}
doCMDf(setTime4)
#endif

#ifdef use_setTime5_function
/**
 * @brief
 */
void setTime5(void)
{
	setPoint5_ms = atoll(ptr_param[0]);
	modo_timer5 = *ptr_param[1];
	time5_ms =  timeStamp;
}
doCMDf(setTime5)
#endif

#ifdef use_setTime6_function
/**
 * @brief
 */
void setTime6(void)
{
	setPoint6_ms = atoll(ptr_param[0]);
	modo_timer6 = *ptr_param[1];
	time6_ms =  timeStamp;
}
doCMDf(setTime6)
#endif


void TicPoll(void)
{
	#ifdef event_etOut1_active
		if ( setPoint1_ms > 0 &&  timeStamp > time1_ms + setPoint1_ms)
		{	
			if(modo_timer1 == 'T')
				setPoint1_ms = 0;
			else
				time1_ms = timeStamp;
			puts_f("#etOut1;\r"); //cuando tOut1 pasa a valer 0
		}
	#endif
	#ifdef event_etOut2_active
		if ( setPoint2_ms > 0 &&  timeStamp > time2_ms + setPoint2_ms)
		{	
			if(modo_timer2 == 'T')
				setPoint2_ms = 0;
			else
				time2_ms = timeStamp;
			puts_f("#etOut2;\r"); //cuando tOut1 pasa a valer 0
		}
	#endif
	#ifdef event_etOut3_active
		if ( setPoint3_ms > 0 &&  timeStamp > time3_ms + setPoint3_ms)
		{	
			if(modo_timer3 == 'T')
				setPoint3_ms = 0;
			else
				time3_ms = timeStamp;
			puts_f("#etOut3;\r"); //cuando tOut1 pasa a valer 0
		}
	#endif
	#ifdef event_etOut4_active
		if ( setPoint4_ms > 0 &&  timeStamp > time4_ms + setPoint4_ms)
		{	
			if(modo_timer4 == 'T')
				setPoint4_ms = 0;
			else
				time4_ms = timeStamp;
			puts_f("#etOut4;\r"); //cuando tOut1 pasa a valer 0
		}
	#endif
	#ifdef event_etOut5_active
		if ( setPoint5_ms > 0 &&  timeStamp > time5_ms + setPoint5_ms)
		{	
			if(modo_timer5 == 'T')
				setPoint5_ms = 0;
			else
				time5_ms = timeStamp;
			puts_f("#etOut5;\r"); //cuando tOut1 pasa a valer 0
		}
	#endif	
	#ifdef event_etOut6_active
		if ( setPoint6_ms > 0 &&  timeStamp > time6_ms + setPoint6_ms)
		{				
			if(modo_timer6 == 'T')
				setPoint6_ms = 0;
			else
				time6_ms = timeStamp;
			puts_f("#etOut6;\r"); //cuando tOut1 pasa a valer 0
		}
	#endif
}
doPoll(TicPoll)
incPoll
