package com.poster.utils;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * Created by huyue on 2017/3/22.
 */
public class ThreadPoolsUtils {

    private static int threadPoolsSize = 10;
    //private static ExecutorService executorService = Executors.newFixedThreadPool(threadPoolsSize);
    private static  ExecutorService executorService = new ThreadPoolExecutor(threadPoolsSize, threadPoolsSize,
            0L, TimeUnit.MILLISECONDS,
            new LinkedBlockingQueue<Runnable>(10000));


    //执行任务
    public static void execute(Runnable runnable){
        executorService.execute(runnable);
    }
}
