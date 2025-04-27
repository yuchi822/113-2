import mariadb
import sys

# 資料庫連線配置
config = {
    'host': 'localhost',
    'user': 'root',
    'password': '000000',
    'database': 'lab_b310',
    'port': 3306
}

conn = None

try:
    # 建立連線
    conn = mariadb.connect(**config)
    print("資料庫連線成功！")

    # 建立游標
    cursor = conn.cursor()

    # 執行簡單查詢
    cursor.execute("SELECT VERSION()")
    version = cursor.fetchone()
    print(f"資料庫版本: {version[0]}")

except mariadb.Error as e:
    print(f"資料庫連線失敗：{e}")
    sys.exit(1)

finally:
    # 關閉連線
    if conn:
        conn.close()
        print("資料庫連線已關閉。")
