package com.example.sendiptotelegram;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

public class SendIpToTelegram {

    public static void main(String[] args) throws IOException {
        // Lấy địa chỉ IP của người dùng
        String ip = getIp();

        // Lấy thời gian truy cập
        String time = String.valueOf(System.currentTimeMillis());

        // Gửi IP và thời gian truy cập đến bot Telegram
        sendToTelegram(ip, time);
    }

    private static String getIp() throws IOException {
        URL url = new URL("https://api.ipify.org/");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Accept", "application/json");
        connection.connect();

        int responseCode = connection.getResponseCode();
        if (responseCode == 200) {
            InputStream inputStream = connection.getInputStream();
            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes);
            String response = new String(bytes);
            return response.replace("\n", "");
        } else {
            throw new IOException("Không thể lấy được địa chỉ IP");
        }
    }

    private static void sendToTelegram(String ip, String time) throws IOException {
        URL url = new URL("https://api.telegram.org/bot6630148049:AAG1xYKPmQvG1EaUCb8_JygwwwF-F2dkNQ0/sendMessage");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Authorization", "Bearer " + "6630148049:AAG1xYKPmQvG1EaUCb8_JygwwwF-F2dkNQ0");

        String data = "chat_id=" + "-1002081721946" + "&text=" + URLEncoder.encode("IP: " + ip + ", Thời gian truy cập: " + time);

        PrintWriter writer = new PrintWriter(connection.getOutputStream());
        writer.print(data);
        writer.flush();

        int responseCode = connection.getResponseCode();
        if (responseCode == 200) {
            System.out.println("Gửi thông tin thành công");
        } else {
            System.out.println("Gửi thông tin thất bại");
        }
    }
}
