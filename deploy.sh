#!/bin/bash
# IPC 심리분석 사이트 배포 스크립트
# 사용법: bash deploy.sh

set -e

echo "=== 1. 프론트엔드 빌드 ==="
cd frontend
npm run build
cd ..

echo "=== 2. 빌드 결과물을 backend/static으로 복사 ==="
rm -rf backend/static
cp -r frontend/dist backend/static

echo "=== 3. 완료! ==="
echo ""
echo "로컬 실행:"
echo "  cd backend && python3 main.py"
echo ""
echo "서버 배포:"
echo "  1. backend/ 폴더 전체를 서버로 업로드"
echo "     scp -r backend/ ubuntu@158.179.194.59:~/ipc-analysis/"
echo ""
echo "  2. 서버에서 실행"
echo "     ssh ubuntu@158.179.194.59"
echo "     cd ~/ipc-analysis"
echo "     pip3 install -r requirements.txt"
echo "     screen -S ipc"
echo "     python3 main.py"
echo "     (Ctrl+A, D 로 screen 빠져나오기)"
echo ""
echo "  3. 접속: http://158.179.194.59:8000"
